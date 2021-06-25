<template>
  <div>
    <div class="text-center mt-12 mb-8">
      <h1>Caliber Table</h1>
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
        :items="calibers"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
  import api from '@/API/api.json';

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Caliber ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Caliber Name', value: 'caliber_name' },
          { text: 'Brand ID', value: 'brand_id' },
          
        ],
        calibers: [],
      }
    },

    mounted() {
      this.calibers = api.calibers
    }
  }
</script>