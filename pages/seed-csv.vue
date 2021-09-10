<template>
  <v-container class="py-5">
    <div class="text-center mt-5 mb-10">
      <h1>Seeding CSV</h1>
    </div>

    <v-form ref="form" v-model="valid">
      <v-row align="center" class="my-5">
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="modelSelected"
            :items="modelOptions"
            required
            label="Select type of csv"
            @change="parseSelect"
            :rules="[(v) => !!v || 'Please select once']"
          ></v-autocomplete>
        </v-col>
        <div class="col-1"></div>

        <v-col cols="12" md="5">
          <label for="upload-csv">
            <p>Upload csv file</p>
            <input
              type="file"
              id="upload-csv"
              accept=".csv"
              ref="inputCsv"
              :disabled="btnInputCSV"
              @change="parseFile"
            />
          </label>
        </v-col>
      </v-row>

      <v-row v-if="noteSuccess" class="text-center note-wrap px-4 py-10">
        <h3 class="notes">Good, your data is valid!</h3>
        <!-- <SnackBar :message="'Good, your data is valid!'" /> -->
      </v-row>

      <v-row class="my-10 ml-2">
        <v-btn
          :disabled="btnSubmit"
          color="success"
          class="mr-4"
          @click="fileSubmit"
        >
          Submit
        </v-btn>
        <v-btn color="warning" class="mr-4" @click="reset"> Reset </v-btn>
      </v-row>
    </v-form>

    <v-col v-if="modelSelected" class="px-0">
      <h4 class="mt-10">Valid Model</h4>
      <v-data-table
        :headers="modelValid.headers"
        :items="modelValid.items"
        class="mb-10 mt-2"
        hide-default-footer
      ></v-data-table>
    </v-col>

    <v-col v-if="fileSelected" class="px-0">
      <h4 class="mt-10">Current Model</h4>
      <v-data-table
        :headers="fileCurrent.headers"
        :items="fileCurrent.items"
        :items-per-page="10"
        class="elevation-1 mb-10 mt-2"
      ></v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import Papa from 'papaparse'
import _ from 'lodash'
// import SnackBar from '@/components/alert/snackBar'
import Models from '@/API/models.json'
// import { mapActions } from 'vuex'

export default {
  props: ['message'],
  data() {
    return {
      valid: true,
      btnSubmit: true,
      btnInputCSV: true,
      noteSuccess: false,

      modelOptions: [],
      modelSelected: '',
      modelValid: {},
      modelArrayValid: [],
      
      fileInput: null,
      fileSelected: false,
      fileCurrent: {},
    }
  },

  components: {
    // SnackBar
  },

  mounted() {
    this.modelOptions = Object.keys(Models)
  },

  methods: {
    async fileSubmit() {
      try {
        let formData = new FormData()
        formData.append('file', this.fileInput)
        await this.$axios.post(`/api/seed/${this.modelSelected}`, formData);
        this.reset();
      } catch (err) {
        console.log(err);
      }
    },

    reset() {
      this.$refs.form.reset()
      this.btnInputCSV = true
      this.$refs.inputCsv.value = ''
      this.modelArrayValid = []
      this.modelValid = {}

      this.resetData()
    },

    resetData() {
      this.$refs.inputCsv.value = ''
      this.noteSuccess = false
      this.btnSubmit = true

      this.fileInput = null
      this.fileSelected = false
      this.fileCurrent = {}
    },
    
    parseFile(event) {
      if (!event.target.files.length) {
        this.resetData();
        return;
      }
      const fileNameExtension = event.target.files[0].name
      if (!fileNameExtension.includes("csv")) {
        alert('File must be csv format')
        this.resetData();
        return;
      }
      let fileName = fileNameExtension.replace(".csv", "")
      let modelSelect = this.modelSelected

      if(fileName != modelSelect) {
        alert('File name is different, file name must capitalize each word and with no space \nSample: \nBrand.csv \nBezelMaterial.csv')
        this.resetData()
      } else {
        var reader = new FileReader()

        reader.readAsText(event.target.files[0])
        reader.onload = (e) => {
          let csvString = e.target.result;
          const lastCsvStringNewLine = _.last(csvString) === "\n";
          csvString = lastCsvStringNewLine ? csvString.substring(0, csvString.length - 1) : csvString;
          Papa.parse(csvString, {
            header: true,

            complete: ({ data, meta }) => {
              if ( data.length <= 1 ) {
                alert('Data not found, please check and update')
                this.resetData()
              } else {
                let keyFiles = meta.fields,
                    keyValid = this.modelArrayValid

                if (_.isEqual(keyFiles, keyValid)) {
                  this.noteSuccess = true
                  this.fileCurrent = this.objectToTable(data)
                  this.fileSelected = true
                  this.btnSubmit = false
                  this.fileInput = event.target.files[0];
                }
              }
            },
          })
        }
      }
    },

    objectToTable(object) {
      let data = {
        headers: [],
        items: [],
      }
      let header = Object.keys(object[0])

      data.items = object

      header.map((e) => {
        data.headers.push({
          text: _.startCase(e),
          value: e,
        })
      })

      return data
    },

    parseSelect() {
      let tempHeader = [],
          tempArray = [],
          data = Models[this.modelSelected]

      data.map((e) => {
        tempHeader.push({ text: e.key, value: e.key })
        tempArray.push(e.key)
      })

      this.btnInputCSV = false
      this.modelValid.headers = tempHeader
      this.modelArrayValid = tempArray
      this.resetData()
    },
  },
}
</script>


<style scoped>
input#upload-csv[disabled] {
  color: silver;
}
.note-wrap .notes {
  width: fit-content;
  color: green;
  margin: 0 auto;
  padding: 10px 20px;
  background: lightgreen;
  border-radius: 5px;
}
</style>