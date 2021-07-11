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
    <Boutique v-if="tableType == 'Boutique'" />
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
    <ProductStatus v-if="tableType == 'Product Status'" />
    <Status v-if="tableType == 'status'" />
    <Subscription v-if="tableType == 'Subscription'" />
    <UserStatus v-if="tableType == 'User Status'" />
    <WatchModel v-if="tableType == 'Watch Model'" />
    
  </v-container>
</template>


<script>
import _ from 'lodash'
import Accompany from '@/components/crudTable/accompany'
import BezelMaterial from '@/components/crudTable/bezelMaterial'
import Boutique from '@/components/crudTable/boutique'
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
import ProductStatus from '@/components/crudTable/productStatus'
import Role from '@/components/crudTable/role'
import Subscription from '@/components/crudTable/subscription'
import UserStatus from '@/components/crudTable/userStatus'
import WatchModel from '@/components/crudTable/watchModel'

export default {
  data() {
    return {
      tableOptions: [
        'Accompany',
        'Bezel Material',
        'Boutique',
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
        'Product Status',
        'Role',
        'Subscription',
        'User Status',
        'Watch Model',
      ],
      tableType: 'Brand',
      // tableValue: [],
    }
  },

  components: {
    Accompany,
    BezelMaterial,
    Boutique,
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
    Role,
    Subscription,
    UserStatus,
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
