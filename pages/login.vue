<template>
  <v-row>
    <v-col cols="12" md="4" class="blank">
      <h1 style="font-size: 5rem">TWS</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit,
        in.
      </p>
    </v-col>

    <v-col cols="12" md="8">
      <v-layout wrap justify-center align-center fill-height>
        <v-col cols="12" md="5">
          <h2 class="pb-10">Login to CMS</h2>
          <v-form lazy-validation>
            <v-text-field
              ref="username"
              v-model="form.username"
              label="Username"
              :rules="nameRules"
              solo
              required
            >
            </v-text-field>

            <v-text-field
              ref="password"
              v-model="form.password"
              lebel="Password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passRules"
              counter
              solo
              required
              @keydown.enter="login"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-btn @click="login" class="signin px-10" :loading="loading" color="success"> Login </v-btn>
          </v-form>
        </v-col>
      </v-layout>
    </v-col>
  </v-row>
</template>


<script>
import { mapState } from 'vuex'

export default {
  middleware({store, redirect}) {
    // console.log('middleware', store.state.auth)
    if(store.state.auth) return redirect('/')
  },

  layout: 'blank',
  data() {
    return {
      form: {
        username: 'admincms',
        password: 'admincms',
      },
      loading: false,
      showPassword: false,
      nameRules: [
        (v) => !!v || 'Userame is required',
        (v) => (v && v.length >= 4) || 'Userame min 4 characters',
      ],
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Password min 6 characters',
      ],
    }
  },

  computed: {
    ...mapState(['auth'])
  },

  methods: {
    async login() {
      this.loading = true
      try {
        await this.$store.dispatch('login', this.form)
        // console.log('login: ', this.form)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },

  head: {
    title: 'Super Secret | TWS Login',
  },
}
</script>

<style scoped>
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
  }
</style>