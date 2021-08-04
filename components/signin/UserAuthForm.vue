<template class="lalalalall">
  <v-form 
    ref="form" 
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="userInfo.name"
      label="Username"
      v-if="hasName"
      :rules="nameRules"
      solo
      required
    >
    </v-text-field>

    <v-text-field
      v-model="userInfo.email"
      label="email@mail.com"
      :rules="emailRules"
      solo
      required
    ></v-text-field>

    <v-text-field
      v-model="userInfo.password"
      lebel="Password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      counter=true
      :rules="passRules"
      solo
      required
    ></v-text-field>

    <v-row style="padding: 12px;" align="center mt-2">
      <v-btn
        @click="submitForm(userInfo)"
        :disabled="!valid"
        class="signin px-10"
        depressed
      >
        {{ buttonTitle }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="loading"
        class="signup"
        color="grey"
        plain
      >
        {{ buttonInverse }}
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        name: 'john',
        email: 'john@tws.com',
        password: 'aaaaaaaa'
      },
      nameRules: [
        (v) => !!v || 'Userame is required',
        (v) => (v && v.length >= 4) || 'Userame min 4 characters',
      ],
      emailRules: [
        (value) => !!value || 'E-mail is required!',
        (value) => {
          let pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        },
      ],
      passRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Password min 6 characters',
      ],
    }
  },

  props: ['submitForm', 'buttonTitle', 'buttonInverse', 'hasName'],
}
</script>


<style scoped>
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: 0 0 0 transparent;
}
.signin.v-btn {
  background-color: #cfba9b !important;
}
.signin .v-btn span {
  color: white;
}
.signup .v-btn__content {
  color: blue !important;
}
</style>
