<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Watch Model Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Watch Model
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
                      v-model="editedItem.referenceNumber"
                      label="Reference Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.caseMaterial"
                      label="Case Material"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.caseDiameter"
                      label="Case Diameter"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.caseThickness"
                      label="Case Thickness"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.waterResistance"
                      label="Water Resistance"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.glass"
                      label="Glass"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.streetName"
                      label="Street Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.lugWidth"
                      label="Lug Width"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.introduceAt"
                      label="Introduce At"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.discontinueAt"
                      label="Discontinue At"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.powerReserved"
                      label="Power Reserved"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.numberOfJewel"
                      label="Number Of Jewel"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.dialNumeral"
                      label="Dial Numeral"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.otherInfo"
                      label="Other Info"
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
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.caliberId"
                      :items="caliberOption"
                      label="Caliber ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.movementId"
                      :items="movementOption"
                      label="Movement ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.bezelMaterialId"
                      :items="bezelMaterialOption"
                      label="Bazel Material ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.braceletMaterialId"
                      :items="braceletMaterialOption"
                      label="Bracelet Material ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.braceletColorId"
                      :items="braceletColorOption"
                      label="Bracelet Color ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.claspId"
                      :items="claspOption"
                      label="Clasp ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.claspMaterialId"
                      :items="claspMaterialOption"
                      label="Clasp Material ID"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.functionId"
                      :items="functionOption"
                      label="Function ID"
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
import WatchModel from '@/api/watchModels'
import Caliber from '@/api/calibers'

export default {
  data: () => ({
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

    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Reference Number', value: 'referenceNumber' },
      { text: 'Case Material', value: 'caseMaterial' },
      { text: 'Case Diameter', value: 'caseDiameter' },
      { text: 'Case Thickness', value: 'caseThickness' },
      { text: 'Water Resistance', value: 'waterResistance' },
      { text: 'Glass', value: 'glass' },
      { text: 'Street Name', value: 'streetName' },
      { text: 'Lug Width', value: 'lugWidth' },
      { text: 'Introduce At', value: 'introduceAt' },
      { text: 'Discontinue At', value: 'discontinueAt' },
      { text: 'Power Reserved', value: 'powerReserved' },
      { text: 'Number Of Jewel', value: 'numberOfJewel' },
      { text: 'Dial Numeral', value: 'dialNumeral' },
      { text: 'Other Info', value: 'otherInfo' },
      { text: 'Collection ID', value: 'collectionId' },
      { text: 'Caliber ID', value: 'caliberId' },
      { text: 'Movement ID', value: 'movementId' },
      { text: 'Bezel Material ID', value: 'bezelMaterialId' },
      { text: 'Bracelet Material ID', value: 'braceletMaterialId' },
      { text: 'Bracelet Color ID', value: 'braceletColorId' },
      { text: 'Clasp ID', value: 'claspId' },
      { text: 'Clasp Material ID', value: 'claspMaterialId' },
      { text: 'Function ID', value: 'functionId' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: WatchModel,
    editedIndex: -1,
    editedItem: {
      referenceNumber: "",
      caseMaterial: "",
      caseDiameter: "",
      caseThickness: "",
      waterResistance: "",
      glass: "",
      streetName: "",
      lugWidth: "",
      introduceAt: "",
      discontinueAt: "",
      powerReserved: "",
      numberOfJewel: "",
      dialNumeral: "",
      otherInfo: "",
      collectionId: "",
      caliberId: "",
      movementId: "",
      bezelMaterialId: "",
      dialMaterialId: "",
      braceletMaterialId: "",
      braceletColorId: "",
      claspId: "",
      claspMaterialId: "",
      functionId: "",
    },
    defaultItem: {
      referenceNumber: "",
      caseMaterial: "",
      caseDiameter: "",
      caseThickness: "",
      waterResistance: "",
      glass: "",
      streetName: "",
      lugWidth: "",
      introduceAt: "",
      discontinueAt: "",
      powerReserved: "",
      numberOfJewel: "",
      dialNumeral: "",
      otherInfo: "",
      collectionId: "",
      caliberId: "",
      movementId: "",
      bezelMaterialId: "",
      dialMaterialId: "",
      braceletMaterialId: "",
      braceletColorId: "",
      claspId: "",
      claspMaterialId: "",
      functionId: "",
    },
  }),

  mounted() {
    Caliber.map((e) => {
      this.caliberOption.push(`${e.id}`)
    })
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Add Watch Model` : `Edit Watch Model`
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