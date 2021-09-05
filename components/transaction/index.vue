<template>
  <v-data-table @pagination="pagination" :headers="headers" :items="items" :loading="tableLoading" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Transaction Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn color="primary" dark plain @click="toggleId">
          {{ showId ? "Hide ID" : "Show ID" }}
        </v-btn>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="95vw">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Transaction
            </v-btn>
          </template> -->

          <v-card class="px-10">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-row>
              <v-col cols="12" md="8" class="px-3">
                <BuyerSeller />
              </v-col>

              <v-col cols="12" md="4" class="px-3">
                <Stepper />
              </v-col>
            </v-row>

            <v-divider class="mt-10 mb-5" horizontal></v-divider>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                     <v-autocomplete
                      v-model="editedItem.currency"
                      label="Currency"
                      :items="currencyOption"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-divider class="mt-10 mb-5" horizontal></v-divider>

                <v-row>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.stasusId"
                      label="Status ID"
                      :items="statusOption"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.buyerProductId"
                      label="Buyer Product ID"
                      :items="buyerProductOption"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.sellerProductId"
                      label="Seller Product ID"
                      :items="sellerProductOption"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 pt-10 pb-5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.no`]="options">
      {{ options.index + 1 + (paginationInfo.page - 1)*paginationInfo.itemsPerPage}}
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ toDate(item.createdAt) }}
    </template>
    <template v-slot:[`item.updatedAt`]="{ item }">
      {{ toDate(item.updatedAt) }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import models from '@/API/models'
import OptionsId from './optionsId'
import Stepper from './stepper'
import BuyerSeller from './buyerSeller'

export default {
  data: () => ({
    model: 'Transaction',
    showId: false,
    dialog: false,
    dialogDelete: false,
    statusOption: [],
    currencyOption: [],
    buyerProductOption: [],
    sellerProductOption: [],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    paginationInfo: {},
    tableLoading: false
  }),

  mounted() {
    this.fetchTransaction()
  },

  components: {
    OptionsId,
    Stepper,
    BuyerSeller
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Add Transaction` : `Edit Transaction`
    },
    headers() {
      const idObj = {
        key: "id",
        type: "string",
      }
      const idHeaders = _.filter(this.mapping, (item) => /Id/.test(item.key));
      const idPopulatedHeaders = _.map(idHeaders, (item) => ({ key: item.key.replace(/Id/, ""), type: "string" }))
      const nonIdHeaders = _.filter(this.mapping, (item) => !/Id/.test(item.key));
      const idColumn = this.showId ? [idObj, ...idHeaders] : []

      const completedMapping = [
        {
          key: "no",
          type: "number",
        },
        ...idColumn,
        ...idPopulatedHeaders,
        ...nonIdHeaders,
        {
          key: "createdAt",
          type: "date",
        },
        {
          key: "updatedAt",
          type: "date",
        },
        { 
          text: 'actions',
          type: 'actions',
        },
      ]
      return completedMapping.map((item) => {
        if (item.type === "actions") {
          return {
            text: 'Actions',
            value: 'actions',
            sortable: false,
          };
        }
        return {
          text: this.fromCamelToLabel(item.key),
          value: item.key,
        }
      })
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    "model.name": function (val) {
      this.fetchTransaction();
      // this.seperateModels();
    }
  },

  methods: {
    async fetchTransaction() {
      try {
        this.tableLoading = true;
        const { data } = await this.$axios.get(`/api/cms/Transaction`);
        this.items = _.cloneDeep(data);

      } catch (err) {
        console.log(err);
      }
      this.tableLoading = false;
    },
    
    pagination(payload) {
      this.paginationInfo = payload;
    },

    toDate(item) {
      return moment(item).fromNow();
    },
    
    toggleId() {
      this.showId = !this.showId;
    },

    fromCamelToLabel(text) {
      const result = text.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },

    editItem(item) {
      if (this.tableLoading) {
        return;
      }
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>