<template>
   <v-card>
      <v-card-title class="text-h5 pt-10 pb-5"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions class="pb-5">
        <v-spacer></v-spacer>
        <v-btn :disabled="tableLoading" color="blue darken-1" text @click="closeModal"
          >Cancel</v-btn
        >
        <v-btn :disabled="tableLoading" color="blue darken-1" text @click="deleteItemConfirm"
          >OK</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: ['tableLoading', 'model', 'items', 'editedIndex'],
  methods: {
    closeModal() {
      this.close();
      this.closeDelete();
      this.editedIndex = -1;
    },

    deleteItemConfirm() {
      this.tableLoading = true;
      this.$axios.delete(`/api/cms/${this.model.name}?id=${this.items[this.editedIndex].id}`)
        .then(() => {
          this.items.splice(this.editedIndex, 1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoading = false;
          this.editedIndex = -1;
        })
      this.closeDelete()
    },
  }
}
</script>
