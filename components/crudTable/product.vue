<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Product Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Product
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
                      v-model="editedItem.year"
                      label="Year"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.pice"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.currency"
                      :items="currencyOption"
                      label="Currency"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="description At"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-file-input
                      v-model="editedItem.topImage"
                      show-size
                      counter
                      accept="image/png, image/jpeg, image/jpg"
                      label="Top Image"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-file-input
                      v-model="editedItem.crownSideImage"
                      show-size
                      counter
                      accept="image/png, image/jpeg, image/jpg"
                      label="Crown Side Image"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-file-input
                      v-model="editedItem.crownBackImage"
                      show-size
                      counter
                      accept="image/png, image/jpeg, image/jpg"
                      label="Crown Back Image"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-file-input
                      v-model="editedItem.showOffImage"
                      show-size
                      counter
                      accept="image/png, image/jpeg, image/jpg"
                      label="Show Off Image"
                    ></v-file-input>
                  </v-col>
                  
                </v-row>

                <v-divider class="mt-10 mb-5" horizontal></v-divider>

                <v-row>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.referenceId"
                      :items="referenceOption"
                      label="Reference ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.conditionId"
                      :items="conditionOption"
                      label="Condition ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.accompanyId"
                      :items="accompanyOption"
                      label="Accompany ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.boutiquelId"
                      :items="boutiquelOption"
                      label="Boutique ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.productStatuslId"
                      :items="productStatuslOption"
                      label="Product Status ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.matchProductId"
                      :items="matchProductOption"
                      label="Match Product ID"
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
import Product from '@/api/products'
// import Condition from '@/api/conditions'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    currencyOption: [],
    referenceOption: [],
    conditionOption: [],
    accompanyOption: [],
    boutiqueOption: [],
    productStatusOption: [],
    matchProductOption: [],

    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Year', value: 'ear' },
      { text: 'Price', value: 'price' },
      { text: 'Currency', value: 'currency' },
      { text: 'Top Image', value: 'topImage' },
      { text: 'Crown Side Image', value: 'crownSideImage' },
      { text: 'Crown Back Image', value: 'crownBackImage' },
      { text: 'Show Off Image', value: 'showOffImage' },
      { text: 'Reference ID', value: 'referenceId' },
      { text: 'Condition ID', value: 'conditionId' },
      { text: 'Accompany ID', value: 'accompanyId' },
      { text: 'Boutique ID', value: 'boutiqueId' },
      { text: 'Product Status ID', value: 'productStatusId' },
      { text: 'Match Product ID', value: 'matchProductId' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: Product,
    editedIndex: -1,
    editedItem: {
      year: '',
      price: '',
      currency: '',
      description: '',
      topImage: '',
      crownSideImage: '',
      crownBackImage: '',
      showOffImage: '',
      referenceId: '',
      conditionId: '',
      accompanyId: '',
      boutiqueId: '',
      productStatusId: '',
      matchProductId: '',
    },
    defaultItem: {
      year: '',
      price: '',
      currency: '',
      description: '',
      topImage: '',
      crownSideImage: '',
      crownBackImage: '',
      showOffImage: '',
      referenceId: '',
      conditionId: '',
      accompanyId: '',
      boutiqueId: '',
      productStatusId: '',
      matchProductId: '',
    },
  }),

  mounted() {
    // Caliber.map((e) => {
    //   this.caliberOption.push(`${e.id}`)
    // })
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Add Product` : `Edit Product`
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