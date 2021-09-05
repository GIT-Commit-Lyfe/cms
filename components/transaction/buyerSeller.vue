<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Buyer', value: 'buyer', },
        { text: 'Seller', value: 'seller' },
      ],
      desserts: [
        {
          buyer: 'buyer_1',
          seller: 'seller_1',
        },
        {
          buyer: 'buyer_2',
          seller: 'seller_2',
        },
      ],
    }
  },
}
</script>
