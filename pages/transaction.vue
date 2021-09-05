<template>
  <v-container>
    <div class="text-center mt-5 mb-10">
      <h2>Transaction</h2>
    </div>
    
    <Transaction :model="modelTransaction" :mapping="models[model]"/>
  </v-container>
</template>


<script>
import _ from 'lodash'
import models from '@/API/models.json'
import Transaction from '@/components/crudTable'

export default {
  data() {
    return {
      model: "Transaction",
      models
    }
  },

  components: {
    Transaction
  },

  computed: {
    modelTransaction() {
      return {
        name: this.model,
        label: this.model,
      }
    },
  },
}
</script>


<style scoped>

</style>
