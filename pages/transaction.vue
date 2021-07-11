<template>
  <v-container>
    <div class="text-center mt-5 mb-10">
      <h2>Transaction</h2>
    </div>

    <!-- <v-layout class="d-flex" align-center>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="tableType"
          :items="tableOptions"
          required
          label="Chose table type"
          :rules="[(v) => !!v || 'Please select once']"
        ></v-autocomplete>
      </v-col>
    </v-layout> -->

    <Transaction/>
  </v-container>
</template>


<script>
import _ from 'lodash'
import Transaction from '@/components/crudTransaction/transaction'

export default {
  data() {
    return {
      tableType: 'Brand',
      // tableValue: [],
    }
  },

  components: {
    Transaction
  },

  mounted() {
    // this.tableOptions = Object.keys(RealTable)
    // this.parseSelect()
  },

  methods: {
    // objectToTable(object) {
    //   let data = {
    //     headers: [],
    //     items: [],
    //   }
    //   let header = Object.keys(object[0])

    //   data.items = object

    //   header.map((e) => {
    //     data.headers.push({
    //       text: _.startCase(e),
    //       value: e,
    //     })
    //   })

    //   return data
    // },

    // parseSelect() {
    //   let data = RealTable[this.tableType]
    //   this.tableValue = this.objectToTable(data)
    // },
  },
}
</script>
