<template>
  <div>
    <div class="text-center mt-12 mb-8">
      <h1>Clasps Table</h1>
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
        :items="clasps"
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
            text: 'Clasp ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Clasp Name', value: 'clasp_name' },
          
        ],
        clasps: [],
      }
    },

    mounted() {
      this.clasps = api.clasps
    }
  }
</script>