<template>
  <v-container>
    <div class="text-center mt-5 mb-10">
      <h2>Tables</h2>
    </div>

    <v-layout class="d-flex" align-center>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="tableType"
          :items="tableOptions"
          required
          label="Chose table type"
          :rules="[(v) => !!v || 'Please select once']"
        ></v-autocomplete>
      </v-col>
    </v-layout>

    <Accompany v-if="tableType == 'Accompany'" />
    <BezelMaterial v-if="tableType == 'Bezel Material'" />
    <BraceletColor v-if="tableType == 'Bracelet Color'" />
    <BraceletMaterial v-if="tableType == 'Bracelet Material'" />
    <Brand v-if="tableType == 'Brand'" />
    <Caliber v-if="tableType == 'Caliber'" />
    <Clasp v-if="tableType == 'Clasp'" />
    <ClaspMaterial v-if="tableType == 'Clasp Material'" />
    <Collection v-if="tableType == 'Collection'" />
    <Condition v-if="tableType == 'Condition'" />
    <DialMaterial v-if="tableType == 'Dial Material'" />
    <Function v-if="tableType == 'Function'" />
    <Movement v-if="tableType == 'Movement'" />
    <Product v-if="tableType == 'Product'" />
    <WatchModel v-if="tableType == 'Watch Model'" />
    
  </v-container>
</template>


<script>
import _ from 'lodash'
import Accompany from '@/components/crudTable/accompany'
import BezelMaterial from '@/components/crudTable/bezelMaterial'
import BraceletColor from '@/components/crudTable/braceletColor'
import BraceletMaterial from '@/components/crudTable/braceletMaterial'
import Brand from '@/components/crudTable/brand'
import Caliber from '@/components/crudTable/caliber'
import Clasp from '@/components/crudTable/clasp'
import ClaspMaterial from '@/components/crudTable/claspMaterial'
import Collection from '@/components/crudTable/collection'
import Condition from '@/components/crudTable/condition'
import DialMaterial from '@/components/crudTable/dialMaterial'
import Function from '@/components/crudTable/function'
import Movement from '@/components/crudTable/movement'
import Product from '@/components/crudTable/product'
import WatchModel from '@/components/crudTable/watchModel'

export default {
  data() {
    return {
      tableOptions: [
        'Accompany',
        'Bezel Material',
        'Bracelet Color',
        'Bracelet Material',
        'Brand',
        'Caliber',
        'Clasp',
        'Clasp Material',
        'Collection',
        'Condition',
        'Dial Material',
        'Function',
        'Movement',
        'Product',
        'Watch Model',
      ],
      tableType: 'Brand',
      // tableValue: [],
    }
  },

  components: {
    Accompany,
    BezelMaterial,
    BraceletColor,
    BraceletMaterial,
    Brand,
    Caliber,
    Clasp,
    ClaspMaterial,
    Collection,
    Condition,
    DialMaterial,
    Function,
    Movement,
    Product,
    WatchModel,
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
