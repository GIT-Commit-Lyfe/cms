<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Transaction Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Transaction
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

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
import Transaction from '@/api/transactions'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    statusOption: [],
    buyerProductOption: [],
    sellerProductOption: [],
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Price', value: 'price' },
      { text: 'Currency', value: 'currency' },
      { text: 'Status ID', value: 'statusId' },
      { text: 'Buyer Product ID', value: 'buyerProductId' },
      { text: 'Seller Product ID', value: 'sellerProductId' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: Transaction,
    editedIndex: -1,
    editedItem: {
      price: '',
      currency: '',
      statusId: '',
      buyerProductId: '',
      sellerProductId: '',
    },
    defaultItem: {
      price: '',
      currency: '',
      statusId: '',
      buyerProductId: '',
      sellerProductId: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Add Transaction` : `Edit Transaction`
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem(item) {
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