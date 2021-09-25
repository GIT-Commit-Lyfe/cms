<template>
  <div class="py-10">
    <TopPanel />
    <BestProductSeller />
  </div>
</template>

<script>
import TopPanel from './topPanel.vue'
import BestProductSeller from './bestProductSeller.vue'

export default {
  components: {
    TopPanel,
    BestProductSeller
  }
}
</script>
