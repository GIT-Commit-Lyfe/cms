<template>
  <v-snackbar v-model="showSnackbar" :timeout="timeout" :color="color">
    {{ message }}
      <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    color: 'warning',
    timeout: 3000,
    message: '',
    showSnackbar: false,
  }),

  methods: {
    show(data) {
      this.color = data.color || 'success'
      this.timeout = data.timeout || 3000
      this.message = data.message || 'missing "message"'
    }
  }
}
</script>