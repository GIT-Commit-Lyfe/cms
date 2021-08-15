<template>
  <v-data-table :loading="tableLoading" :headers="headers" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ model.label }} Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add {{ model.label }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col v-for="(item, index) in mapping" :key="index" cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem[item.key]"
                      :label="fromCamelToLabel(item.key)"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="mt-10 mb-5" horizontal></v-divider>

                <v-row>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.collectionId"
                      :items="collectionOption"
                      label="Collection ID"
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

        <v-dialog v-model="dialogDelete" max-width="600px">
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
      <v-btn color="primary"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import _ from 'lodash'
import moment from "moment"
import WatchModel from '@/api/watchModels'
import Caliber from '@/api/calibers'

export default {
  props: [
    "model",
    "mapping",
  ],
  data: () => ({
    tableLoading: false,
    dialog: false,
    dialogDelete: false,
    collectionOption: [],
    caliberOption: [],
    movementOption: [],
    bezelMaterialOption: [],
    dialMaterialOption: [],
    braceletMaterialOption: [],
    braceletColorOption: [],
    claspOption: [],
    claspMaterialOption: [],
    functionOption: [],
    items: [],
    editedIndex: -1,
    editedItem: {},
  }),

  mounted() {
    Caliber.map((e) => {
      this.caliberOption.push(`${e.id}`)
    })
    this.fetchData();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Add ${this.model.label}` : `Edit ${this.model.label}`
    },
    headers() {
      const completedMapping = [
        {
          key: "id",
          type: "string",
        },
        ...this.mapping,
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
    defaultItem() {
      if (!Array.isArray(this.mapping)) {
        return {}
      }
      const defaultObj = {};
      this.mapping.forEach(item => {
        switch (item.type) {
          case "string":
            defaultObj[item.key] = "";
            break;
          case "number":
            defaultObj[item.key] = -1;
            break;
          default:
            break;
        }
      });
      return defaultObj;
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    "model.name": function (val) {
      this.fetchData();
    }
  },

  methods: {
    // api
    async fetchData() {
      try {
        this.tableLoading = true;
        const { data } = await this.$axios.get(`/api/cms/${this.model.name}`);
        this.items = _.cloneDeep(data);
      } catch (err) {
        console.log(err);
      }
      this.tableLoading = false;
    },

    toDate(item) {
      return moment(item).fromNow();
    },
    fromCamelToLabel(text) {
      const result = text.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      const defaultKeys = Object.keys(this.defaultItem);
      this.editedItem = _.pick(item, defaultKeys);
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      const defaultKeys = Object.keys(this.defaultItem);
      this.editedItem = _.pick(item, defaultKeys);
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.tableLoading = true;
      this.$axios.delete(`/api/cms/${this.model.name}?id=${this.items[this.editedIndex].id}`)
        .then(() => {
          this.items.splice(this.editedIndex, 1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
          this.editedIndex = -1;
        })
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    save() {
      this.tableLoading = true;
      if (this.editedIndex > -1) {
        this.$axios.patch(`/api/cms/${this.model.name}?id=${this.items[this.editedIndex].id}`, this.editedItem)
          .then(({ data }) => {
            Object.assign(this.items[this.editedIndex], data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.tableLoading = false;
            this.editedIndex = -1;
          })
      } else {
        this.$axios.post(`/api/cms/${this.model.name}`, this.editedItem)
          .then(({ data }) => {
            this.items.push(data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.tableLoading = false;
            this.editedIndex = -1;
          })
      }
      this.close()
    },
  },
}
</script>