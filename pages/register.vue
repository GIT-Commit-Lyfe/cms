<template>
    <v-row>
    <v-col cols="12" md="4" class="blank">
      <h1 style="font-size: 5rem">TWS</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, in.</p>
    </v-col
    >

    <v-col cols="12" md="8">
      <v-layout wrap justify-center align-center fill-height>
        <v-col cols="12" md="6">
          <h2 class="pb-5">Sign Up to CMS</h2>
          <OauthForm />
          <hr class="divider my-10">
          <UserAuthForm buttonTitle="Sign Up" buttonInverse="Sign In now!" :hasName="true" :submitForm="registerUser" />
        </v-col>
      </v-layout>
    </v-col>
  </v-row>
</template>


<script>
import UserAuthForm from '@/components/signin/UserAuthForm'
import OauthForm from '@/components/signin/OauthForm'

export default {
  layout: 'blank',
  components: {
    UserAuthForm,
    OauthForm
  },

  methods: {
    registerUser(registrationInfo) {
      alert('Hello Register')
    }
  },
}
</script>

<style scoped>
.v-application--wrap > .v-row {
  height: 100vh;
}

.blank {
  padding: 6% 5%;
  color: white;
  background-color: #cfba9b;
}

@media (max-width: 768px) {
  h2 {
    text-align: center;
  }
  .blank {
    display: none;
  }
  .layout {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 5%;
  }
}
</style>