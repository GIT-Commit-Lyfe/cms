<template>
  <v-container>
    <div class="text-center mt-5 mb-10">
      <h2>Tables</h2>
    </div>

    <v-layout class="d-flex" align-center>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="tableType"
          :items="tableOptions"
          required
          dense
          label="Choose table type"
          :rules="[(v) => !!v || 'Please select once']"
        ></v-autocomplete>
      </v-col>
    </v-layout>

    <Table :model="selectedModel" :mapping="models[selectedModel.name]" />
    
  </v-container>
</template>


<script>
import _ from 'lodash'
import Table from '@/components/crudTable'
import models from "@/API/models.json";

export default {
  data() {
    return {
      tableOptions: [
        'Accompany',
        'Audit',
        'Bezel',
        'Boutique',
        'Bracelet Color',
        'Bracelet',
        'Brand',
        'Caliber',
        'Collection',
        'Clasp',
        'Condition',
        'Crystal',
        'Dial',
        'Movement',
        'MovementType',
        'Product',
        'Product Status',
        'Rating',
        'Role',
        'Subscription',
        'Transaction Info',
        'Transaction Rating',
        'Transaction Status',
        'Unused File',
        'User Status',
        'User',
        'Watch Function',
        'Watch Function Model',
        'Watch Model',
      ],
      tableType: 'Brand',
      models,
    }
  },

  components: {
    Table,
  },

  computed: {
    modelOptions() {
      return this.tableOptions.map((item) => {
        return {
          name: item.replace(" ", ""),
          label: item,
        }
      })
    },
    selectedModel() {
      return this.modelOptions.find((item) => {
        console.log(item.label)
        return item.label === this.tableType;
      }) || {}
    },
  },

  methods: {
    
  }
}
</script>
