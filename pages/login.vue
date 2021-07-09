<template>
  <v-layout wrap justify-center align-center fill-height>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="form-login"
    >
      <div class="text-center mb-6">
        <h2>Sign In</h2>
      </div>

      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        :rules="passRules"
        label="Password"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="validate"
        class="mt-10"
      >
        Submit
      </v-btn>
    </v-form>
  </v-layout>

</template>


<script>
export default {
  layout: 'blank',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      emailRules: [
        value => !!value || 'e-mail required!',
        value =>{
          let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      ],
      passRules: [
        v => !!v || 'password required',
        v => (v && v.length >= 6) || 'Password min 6 characters',
      ],
    }
  },

  methods: {
    login() {
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    }
  },
}
</script>

<style scoped>
.form-login {
  max-width: 500px;
  min-width: 300px;
  margin: 0 auto;
  padding: 40px 30px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 8px #C4C4C4;
}
</style>