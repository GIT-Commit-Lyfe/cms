<template>
  <div>
    <div class="text-center mt-12 mb-8">
      <h1>Modal Table</h1>
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
        :items="models"
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
            text: 'Model ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Model Name', value: 'modal_name' },
          { text: 'Brand ID', value: 'brandId' },
          
        ],
        models: [],
      }
    },

    mounted() {
      this.models = api.models
    }
  }
</script>