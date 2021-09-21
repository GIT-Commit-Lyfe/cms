<template>
  <v-data-table
    show-expand
    single-expand
    @pagination="pagination"
    :loading="tableLoading"
    :headers="headers"
    :items="items"
    :search="searchBar"
    :custom-filter="customFilter"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ model.label }} Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn color="primary" dark plain @click="toggleId">
          {{ showId ? 'Hide ID' : 'Show ID' }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="copying" plain color="grey" dark @click="cancelCopying">
          Cancel
        </v-btn>
        <v-btn v-if="copying" plain color="primary" @click="pasteCopying" dark>
          Paste
        </v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" :max-width="dialogWidth">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add {{ model.label }}
            </v-btn>
          </template>
          <v-card class="px-10 py-5">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <!-- transaction -->
            <template v-if="dialogTransaction">
              <v-divider class="mt-10 mb-5" horizontal></v-divider>

              <v-row class="mt-2">
                <v-col cols="12" md="5" class="px-5">
                  <ImageThumbnail />
                </v-col>

                <v-col cols="12" md="7" class="px-5" >
                  <template>
                    <v-row class="mb-5" justify="start">
                      <v-col cols="12" md="6" class="p-2">
                        <v-card outlined >
                          <v-list-item three-line>
                            <v-list-item-content>
                              <div class="text-overline mb-2">
                                Seller
                              </div>
                              <v-list-item-title class="text-h5 mb-1">
                                Seller Name
                              </v-list-item-title>
                              <v-list-item-subtitle>Lorem ipsum, dolor sit amet consectetur adipisicing</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6" class="p-2">
                        <v-card outlined >
                          <v-list-item three-line>
                            <v-list-item-content>
                              <div class="text-overline mb-2">
                                Buyer
                              </div>
                              <v-list-item-title class="text-h5 mb-1">
                                Buyer Name
                              </v-list-item-title>
                              <v-list-item-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-col>
                    </v-row>

                    <div class="text-h5 mb-4 font-weight-light">Rolex Daytona 6240 Chronograph Verified Authentic by Rolex, EXTREMELY RARE</div>
                    <div class="text-h4 bold font-weight-bold">$200,000</div>
                    <div class="text-p mb-5" style="font-size: 11px;">Price option</div>
                    <template>
                      <div class="text-p mb-2">This Rolex Daytona 6240 Chronograph Vintage watch has been verified as authentic by Rolex. Authenticity report is available upon request. The reference 6240 was the first Daytona to incorporate screw-down pushers. Manufactured solely in stainless steel, the chronograph also features an acrylic tachometer bezel. In production from 1965 through 1969, approximately 1,700 pieces were made. The case is in overall good condition. Crystal glazing with light scratches. The dial is in overall good condition with some surface wear. The movement is running and chronograph is operating. Model No. 6240, Serial No. 1439065, Bracelet No. 6635/0. Comes with a new original Rolex travel pouch.
                      </div>
                    </template>
                  </template>
                </v-col>
              </v-row>

              <v-col>
                <div class="text-h5 mt-10 pb-3">Transaction Status</div>
                <template>
                  <v-stepper alt-labels>
                    <v-stepper-header>
                      <v-stepper-step step="1" complete>
                        Verification
                      </v-stepper-step>
                      <v-divider></v-divider>

                      <v-stepper-step step="2" complete >
                        Paid
                      </v-stepper-step>
                      <v-divider></v-divider>

                      <v-stepper-step step="3" complete >
                        Shipping
                        <small class="pt-2">Lorem, ipsum.</small>
                        <small class="pt-1">Lorem, ipsum.</small>
                      </v-stepper-step>
                      <v-divider></v-divider>

                      <v-stepper-step step="4" complete >
                        Done
                      </v-stepper-step>
                      <v-divider></v-divider>

                      <v-stepper-step :rules="[() => false]" step="5" >
                        Pending
                        <small class="pt-2">Pending message</small>
                      </v-stepper-step>
                    </v-stepper-header>
                  </v-stepper>
                </template>
              </v-col>
              <v-divider class="mt-10 mb-5" horizontal></v-divider>
            </template>
            <!-- end transaction -->

            <v-card-text>
              <v-container>
                <v-row  v-if="!dialogTransaction">
                  <v-col
                    v-for="(model, index) in nonRelationModels"
                    :key="'01-'+index"
                    cols="12"
                    :md="md(nonRelationModels.length, model.type)"
                    :sm="sm(nonRelationModels.length, model.type)"
                  >
                    <v-textarea
                      v-if="isTextArea(model)"
                      clearable
                      outlined
                      rows="3"
                      v-model="editedItem[model.key]"
                      :label="fromCamelToLabel(model.key)"
                    ></v-textarea>
                    <v-text-field
                      v-else
                      v-model="editedItem[model.key]"
                      :label="fromCamelToLabel(model.key)"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="mt-10 mb-5" horizontal v-if="!dialogTransaction && relationModels.length > 0"></v-divider>

                <v-row>
                  <v-col
                    v-for="(model, index) in relationModels"
                    :key="'02-'+index"
                    cols="12"
                    :md="md(relationModels.length, model.type)"
                    :sm="sm(relationModels.length, model.type)"
                  >
                    <OptionsId
                      :model="model.key"
                      @updateItem="updateItem"
                      :modelId="editedItem[model.key]"
                    />
                  </v-col>
                </v-row>

                <v-divider class="mt-10 mb-5" horizontal v-if="!dialogTransaction && fileModels.length > 0"></v-divider>

                <v-row>
                  <v-col
                    v-for="(model, index) in fileModels"
                    :key="'03-'+index"
                    cols="12"
                    :md="md(fileModels.length, model.type)"
                    :sm="sm(fileModels.length, model.type)"
                  >
                    <h3 class="mb-3">{{ fromCamelToLabel(model.key) }}</h3>
                    <v-progress-circular
                      v-if="uploadingImage[model.key]"
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                    <v-img
                      v-if="editedItem[model.key]"
                      :src="editedItem[model.key]"
                      max-width="20%"
                      contain
                    ></v-img>
                    <v-btn
                      v-if="editedItem[model.key]"
                      color="blue darken-1"
                      text
                      @click="updateImage(model.key)"
                    >
                      Update Image
                    </v-btn>
                    <input
                      v-if="!editedItem[model.key]"
                      type="file"
                      id="upload"
                      ref="inputFile"
                      @change="handleFileChange($event, model.key)"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-col cols="12">
              <v-textarea
                outlined
                name="description"
                label="Description"
                value="input update description"
              ></v-textarea>
            </v-col>
            <v-divider class="mt-5 mb-5" horizontal v-if="dialogTransaction"></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="tableLoading"
                color="blue darken-1"
                text
                @click="closeModal"
              >
                Cancel
              </v-btn>
              <v-btn
                :disabled="tableLoading"
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
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
              <v-btn
                :disabled="tableLoading"
                color="blue darken-1"
                text
                @click="closeModal"
                >Cancel</v-btn
              >
              <v-btn
                :disabled="tableLoading"
                color="blue darken-1"
                text
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="4">
          <v-form @submit="addTag">
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          v-if="Object.values(tags).length > 0"
          class="mx-4"
          color="red"
          plain
          @click="clearTags"
          >Clear tags</v-btn
        >
      </v-row>
      <v-row>
        <v-chip-group class="mx-8 mb-8" column>
          <v-chip close @click:close="removeTag(key)" v-for="(tag, key) in tags" :key="'tag-' + key">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-row>
    </template>
    <template v-slot:[`item.no`]="options">
      {{
        options.index +
        1 +
        (paginationInfo.page - 1) * paginationInfo.itemsPerPage
      }}
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ toDate(item.createdAt) }}
    </template>
    <template v-slot:[`item.updatedAt`]="{ item }">
      {{ toDate(item.updatedAt) }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="copyItem(item)"> mdi-content-copy </v-icon>
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:[`body.prepend`]>
      <tr style="background: lightblue" v-if="copying || copiedIndex !== -1">
        <td></td>
        <td v-for="(header, key) in headers" :key="'data-' + key">
          <span v-if="header.value === 'no'"></span>
          <span v-else-if="header.value === 'createdAt' || header.value === 'updatedAt'">{{ toDate(items[copiedIndex][header.value]) }}</span>
          <span v-else>{{ items[copiedIndex][header.value] }}</span>
        </td>
      </tr>
    </template>
    <template v-slot:expanded-item="{ item, headers }">
      <td :colspan="headers.length">
        <v-row>
          <v-col class="pa-6" cols="3" v-for="(model, index) in fileModels" :key="'img-' + index">
            <h2>{{ fromCamelToLabel(model.key) }}</h2>
            <v-img
              v-if="!!item[model.key]"
              class="white--text align-end"
              :src="item[model.key]"
              width="150"
              height="150"
              contain
              ></v-img
            >
            <span v-else>no image</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-6" cols="6" v-for="(model, index) in textAreaModels" :key="'img1-' + index">
            <v-textarea
              disabled
              clearable
              outlined
              rows="3"
              v-model="editedItem[model.key]"
              :label="fromCamelToLabel(model.key)"
            ></v-textarea>
          </v-col>
        </v-row>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import OptionsId from './optionsId'
import Steppers from '../transaction/stepper.vue'
import BuyerSeller from '../transaction/buyerSeller'
import ImageThumbnail from '../transaction/imageThumbnail.vue'

export default {
  components: {
    OptionsId,
    Steppers,
    BuyerSeller,
    ImageThumbnail,
  },
  props: ['model', 'mapping'],
  data: () => ({
    search: '',
    tags: {},
    paginationInfo: {},
    tableLoading: false,
    showId: false,
    dialog: false,
    width: '200px',
    dialogWidth: '1000px',
    dialogDelete: false,
    items: [],
    relationModels: [],
    nonRelationModels: [],
    fileModels: [],
    uploadingImage: {},
    editedIndex: -1,
    editedItem: {},
    copying: false,
    copiedItem: {},
    copiedIndex: -1,
    dialogTransaction: false,
    pastURLs: [],
    currentURLs: [],
  }),

  mounted() {
    this.fetchData()
    this.seperateModels()
    this.specialTransaction()
  },

  computed: {
    textAreaModels() {
      return this.nonRelationModels.filter((model) => this.isTextArea(model))
    },
    searchBar() {
      const tags = Object.values(this.tags)
      return tags.join(':')
    },
    formTitle() {
      return this.editedIndex === -1
        ? `Add ${this.model.label}`
        : `Edit ${this.model.label}`
    },
    headers() {
      const idObj = {
        key: 'id',
        type: 'string',
      }
      const idHeaders = _.filter(this.mapping, (item) => /Id/.test(item.key))
      const idPopulatedHeaders = _.map(idHeaders, (item) => ({
        key: item.key.replace(/Id/, ''),
        type: 'string',
      }))
      // console.log(idPopulatedHeaders, '<----')
      const nonIdHeaders = _.filter(
        this.mapping,
        (item) => !/Id/.test(item.key) && item.type === "string"
      )
      const idColumn = this.showId ? [idObj, ...idHeaders] : []

      const completedMapping = [
        {
          key: 'no',
          type: 'number',
        },
        ...idColumn,
        ...idPopulatedHeaders,
        ...nonIdHeaders,
        {
          key: 'createdAt',
          type: 'date',
        },
        {
          key: 'updatedAt',
          type: 'date',
        },
        {
          text: 'actions',
          type: 'actions',
        },
      ]
      return completedMapping.map((item) => {
        if (item.type === 'actions') {
          return {
            text: 'Actions',
            value: 'actions',
            sortable: false,
          }
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
      const defaultObj = {}
      this.mapping.forEach((item) => {
        switch (item.type) {
          case 'string':
            defaultObj[item.key] = ''
            break
          case 'file':
            defaultObj[item.key] = ''
            break
          case 'number':
            defaultObj[item.key] = -1
            break
          default:
            break
        }
      })
      return defaultObj
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    'model.name': function (val) {
      this.fetchData()
      this.seperateModels()
    },
  },

  methods: {
    // api
    async fetchData() {
      try {
        this.tableLoading = true
        const { data } = await this.$axios.get(`/api/cms/${this.model.name}`)
        this.items = _.cloneDeep(data)
      } catch (err) {
        console.log(err)
      }
      this.tableLoading = false
    },

    // column calculation
    md(modelLengh, type) {
      if (type === "textarea") {
        return 6;
      }
      return modelLengh < 4 ? 12 / modelLengh : 3
    },
    sm(modelLengh, type) {
      if (type === "textarea") {
        return 8;
      }
      return modelLengh < 3 ? 12 / modelLengh : 4
    },
    isTextArea(item) {
      if (!item) {
        return false
      }
      return item.type === "textarea"
    },

    // event handlers
    updateItem({ model, payload }) {
      this.editedItem[model] = payload
    },
    pagination(payload) {
      this.paginationInfo = payload
    },
    async handleFileChange(event, key) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      try {
        this.uploadingImage[key] = true
        this.$forceUpdate()
        const { data } = await this.$axios.post('/api/upload', formData)
        this.uploadingImage[key] = false
        this.editedItem[key] = data.publicURL
        this.currentURLs.push(data.publicURL)
        this.$forceUpdate()
      } catch (err) {
        alert(err.message)
      }
    },
    updateImage(key) {
      if (this.editedItem[key]) {
        this.pastURLs.push(this.editedItem[key])
      }
      this.editedItem[key] = ''
      this.$forceUpdate()
    },

    seperateModels() {
      this.relationModels = this.mapping.filter((item) =>
        item.key.includes('Id')
      )
      this.nonRelationModels = this.mapping.filter(
        (item) => !item.key.includes('Id') && item.type !== 'file'
      )
      this.fileModels = this.mapping.filter((item) => item.type === 'file')
    },
    toggleId() {
      this.showId = !this.showId
    },
    toDate(item) {
      return moment(item).fromNow()
    },
    fromCamelToLabel(text) {
      return _.startCase(text)
    },
    specialTransaction() {
      if (this.model.label === 'Transaction') {
        this.dialogTransaction = true
        this.dialogWidth = '90vw'
      }
    },
    copyItem(item) {
      if (this.tableLoading) {
        return
      }
      this.copying = true
      this.copiedIndex = this.items.indexOf(item)
      this.copiedItem = _.pick(item, Object.keys(this.defaultItem))
    },
    cancelCopying() {
      if (this.tableLoading) {
        return
      }
      this.resetCopying()
    },
    resetCopying() {
      this.copying = false
      this.copiedIndex = -1
      this.copiedItem = {}
    },
    pasteCopying() {
      this.tableLoading = true
      this.$axios
        .post(`/api/cms/${this.model.name}`, this.copiedItem)
        .then(({ data }) => {
          this.items.push(data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.tableLoading = false
          this.resetCopying()
        })
    },
    addTag(e) {
      e.preventDefault()
      const input = _.trim(this.search.toLowerCase())
      if (!input) {
        this.search = ''
        return
      }
      this.tags[input] = input
      this.tags = Object.assign({}, this.tags)
      this.search = ''
    },
    removeTag(key) {
      delete this.tags[key]
      this.tags = Object.assign({}, this.tags)
    },
    clearTags() {
      this.tags = {}
    },
    customFilter(value, search, item) {
      const transformedValue = value?.toString().toLowerCase()
      const found = this.tags[transformedValue]
      const partialFound = _.find(this.tags, (tag, key) => {
        return transformedValue?.includes(tag)
      })
      return !!found || !!partialFound
    },

    editItem(item) {
      if (this.tableLoading) {
        return
      }
      this.editedIndex = this.items.indexOf(item)
      const defaultKeys = Object.keys(this.defaultItem)
      this.editedItem = _.pick(item, defaultKeys)
      this.dialog = true
    },

    deleteItem(item) {
      if (this.tableLoading) {
        return
      }
      this.editedIndex = this.items.indexOf(item)
      const defaultKeys = Object.keys(this.defaultItem)
      this.editedItem = _.pick(item, defaultKeys)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.tableLoading = true
      this.$axios
        .delete(
          `/api/cms/${this.model.name}?id=${this.items[this.editedIndex].id}`
        )
        .then(() => {
          this.items.splice(this.editedIndex, 1)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.tableLoading = false
          this.editedIndex = -1
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

    closeModal() {
      this.removeUnusedURLs({ save: false });
      this.close()
      this.closeDelete()
      this.editedIndex = -1
    },
    save() {
      this.tableLoading = true
      if (this.editedIndex > -1) {
        this.$axios
          .patch(
            `/api/cms/${this.model.name}?id=${this.items[this.editedIndex].id}`,
            this.editedItem
          )
          .then(({ data }) => {
            Object.assign(this.items[this.editedIndex], data)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.tableLoading = false
            this.editedIndex = -1
          })
      } else {
        this.$axios
          .post(`/api/cms/${this.model.name}`, this.editedItem)
          .then(({ data }) => {
            this.items.push(data)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.tableLoading = false
            this.editedIndex = -1
          })
      }
      this.removeUnusedURLs();
      this.close()
    },
    async removeUnusedURLs(options = { save: true }) {
      if (this.pastURLs.length === 0 && this.currentURLs.length === 0) {
        return
      }

      let urls = [...this.pastURLs]
      if (!options.save) { // if cancel saving
        const unusedURLObj = {}
        urls.splice(0, 1) // avoid first element to be removed
        urls.forEach(url => {
          unusedURLObj[url] = url
        })
        this.currentURLs.forEach(url => {
          unusedURLObj[url] = url
        })
        urls = Object.values(unusedURLObj)
      }

      if (urls.length === 0 ) {
        this.resetURLs()
        return
      }

      try {
        await this.$axios.post('/api/multi-delete-upload', { urls })
        this.resetURLs()
      } catch (err) {
        // no logs
      }
    },
    resetURLs() {
      this.pastURLs = []
      this.currentURLs = []
    }
  },
}
</script>