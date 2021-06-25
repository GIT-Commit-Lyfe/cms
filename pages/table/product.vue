<template>
  <div>
    <div class="text-center mt-12 mb-8">
      <h1>Product Table</h1>
    </div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import api from '@/API/api.json'

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Product ID',
          align: 'start',
          filterable: false,
          value: 'id',
        },
        { text: 'Reference ID', value: 'referenceId' },
        { text: 'Year', value: 'year' },
        { text: 'Currency', value: 'currency' },
        { text: 'Price', value: 'price' },
        { text: 'Description', value: 'description' },
        { text: 'Top Image', value: 'top_image' },
        { text: 'Crown Side Image', value: 'crown_side_image' },
        { text: 'Case Back Image', value: 'case_back_image' },
        { text: 'Show of Image', value: 'show_of_image' },
        { text: 'Condition ID', value: 'conditionId' },
        { text: 'Accompany ID', value: 'accompanyId' },
        { text: 'Store ID', value: 'storeId' },
      ],
      products: [],
    }
  },

  mounted() {
    this.products = api.products
  },
}
</script>