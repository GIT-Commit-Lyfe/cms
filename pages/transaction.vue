<template>
  <v-container>
    <div class="text-center mt-5 mb-10">
      <h2>Transaction</h2>
    </div>
    
    <Transaction :model="model" :mapping="model"/>
  </v-container>
</template>


<script>
import _ from 'lodash'
import models from '@/API/models.json'
import Transaction from '@/components/transaction'

export default {
  data() {
    return {
      model: "Transaction",
    }
  },

  components: {
    Transaction
  },

  computed: {
  },
}
</script>


<style scoped>

</style>
