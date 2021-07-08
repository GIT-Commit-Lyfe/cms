<template>
  <v-container class="py-5">
    <div class="text-center mt-5 mb-10">
      <h1>Seeding CSV</h1>
    </div>

    <v-form ref="form" v-model="valid">
      <v-row align="center" class="my-5">
        <v-col cols="12" md="5">
          <v-autocomplete
            v-model="csvType"
            :items="options"
            required
            label="Type csv"
            @change="parseSelect"
            :rules="[(v) => !!v || 'Please select once']"
          ></v-autocomplete>
        </v-col>
        <div class="col-1"></div>

        <v-col cols="12" md="5">
          <label for="upload-csv">
            <p>input csv</p>
            <input
              type="file"
              id="upload-csv"
              accept=".csv"
              ref="inputCsv"
              :disabled="btnInputFile"
              @change="parseFile"
            />
          </label>
        </v-col>
      </v-row>

      <v-row v-if="noteSuccess" class="text-center note-wrap px-4 py-10">
        <h3 class="notes">Good, your data is valid!</h3>
      </v-row>

      <v-row class="my-10 ml-2">
        <v-btn
          :disabled="btnSubmit"
          color="success"
          class="mr-4"
          @click="submit"
        >
          Submit
        </v-btn>
        <v-btn color="warning" class="mr-4" @click="reset"> Reset </v-btn>
      </v-row>
    </v-form>

    <v-col v-if="csvType" class="px-0">
      <h4 class="mt-10">Suggest Table</h4>
      <v-data-table
        :headers="suggestValue.headers"
        :items="suggestValue.items"
        class="mb-10 mt-2"
        hide-default-footer
      ></v-data-table>
    </v-col>

    <v-col v-if="csvFile" class="px-0">
      <h4 class="mt-10">Real Table</h4>
      <v-data-table
        :headers="realValue.headers"
        :items="realValue.items"
        :items-per-page="5"
        class="elevation-1 mb-10 mt-2"
      ></v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import Papa from 'papaparse'
import _ from 'lodash'
import SuggestTable from '@/api/suggestTable'

export default {
  data() {
    return {
      valid: true,
      btnSubmit: true,
      btnInputFile: true,
      noteSuccess: false,

      options: [],
      csvType: null,
      csvFile: null,

      keysCsvType: [],

      suggestValue: {},
      realValue: {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Brand Name', value: 'brandName' },
        ],
        items: [],
      },
    }
  },

  computed: {},

  methods: {
    submit () {
      console.log('succsess')
    },
    reset() {
      this.$refs.form.reset()
      this.$refs.inputCsv.value = ''
      this.realValue = []
      this.csvFile = false
      this.noteSuccess = false
      this.btnSubmit = true
    },

    parseFile(data) {
      var reader = new FileReader()

      reader.readAsText(data.target.files[0])
      reader.onload = (e) => {
        const dataEmpty = e.target.result == ''

        Papa.parse(e.target.result, {
          header: true,
          complete: ({ data }) => {
            const dataIsEmpty = data.length <= 1

            if (dataIsEmpty) {
              alert('Data not found, please check and update')
            } else {
              let keyFiles = Object.keys(data[0])
              let keyType = Object.keys(SuggestTable[this.csvType][0])

              if (_.isEqual(keyType, keyFiles)) {
                this.realValue = this.objectToTable(data)
                this.csvFile = true
                this.noteSuccess = true
                this.btnSubmit = false
              }
            }
          },
        })
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
      let data = SuggestTable[this.csvType]
      this.suggestValue = this.objectToTable(data)
      if(this.csvType) {
        this.btnInputFile = false
      }
    },
  },

  mounted() {
    this.options = Object.keys(SuggestTable)
    if(this.csvType) {
      this.btnInputFile = false
    }
  },
}
</script>


<style scoped>

.note-wrap .notes {
  width: fit-content;
  color: green;
  margin: 0 auto;
  padding: 10px 20px;
  background: lightgreen;
  border-radius: 5px;
}
</style>