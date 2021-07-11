<template>
  <v-col justify="center" align="center">
      <div class="mt-10 text-center">
        <h1>CMS DASHBOARD</h1>
      </div>
      <br>
      <br>
      <logo />
      <vuetify-logo />
  </v-col>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

    VuetifyLogo