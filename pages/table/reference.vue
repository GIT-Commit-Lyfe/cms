<template>
  <div>
    <div class="text-center mt-12 mb-8">
      <h1>Reference Table</h1>
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
        :items="references"
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
          text: 'Ref ID',
          align: 'start',
          filterable: false,
          value: 'id',
        },
        { text: 'modelId', value: 'modelId' },
        { text: 'reference_number', value: 'reference_number' },
        { text: 'movementId', value: 'movementId' },
        { text: 'power_reserve', value: 'power_reserve' },
        { text: 'caliberId', value: 'caliberId' },
        { text: 'number_of_jevel', value: 'number_of_jevel' },
        { text: 'case_material', value: 'case_material' },
        { text: 'case_diameter', value: 'case_diameter' },
        { text: 'case_thickness', value: 'case_thickness' },
        { text: 'water_resistance', value: 'water_resistance' },
        { text: 'bezelMaterial', value: 'bezelMaterial' },
        { text: 'dialMaterialId', value: 'dialMaterialId' },
        { text: 'dial_numeral', value: 'dial_numeral' },
        { text: 'glass', value: 'glass' },
        { text: 'braceletMaterialId', value: 'braceletMaterialId' },
        { text: 'braceletColorId', value: 'braceletColorId' },
        { text: 'claspdI', value: 'claspdI' },
        { text: 'claspMaterialId', value: 'claspMaterialId' },
        { text: 'functionId', value: 'functionId' },
        { text: 'street_name', value: 'street_name' },
        { text: 'lug_width', value: 'lug_width' },
        { text: 'instroduce_at', value: 'instroduce_at' },
        { text: 'discontinue_at', value: 'discontinue_at' },
        { text: 'other_info', value: 'other_info' },
      ],
      references: [],
    }
  },

  mounted() {
    this.references = api.references
  },
}
</script>