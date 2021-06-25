<template>
  <div>
    <div class="text-center mt-12 mb-8">
      <h1>Bracelet Color Table</h1>
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
        :items="bracelet_colors"
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
            text: 'Bracelet Color ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Color Name', value: 'color_name' },
          
        ],
        bracelet_colors: [],
      }
    },

    mounted() {
      this.bracelet_colors = api.bracelet_colors
    }
  }
</script>