<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.middleName"
                      label="Middle Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.googleConnect"
                      label="Google Connect"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.appleConnect"
                      label="Apple Connect"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.facebookConnect"
                      label="Facebook Connect"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.mobile"
                      label="Mobile"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-text-field
                      v-model="editedItem.config"
                      label="Mobile"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-file-input
                      v-model="editedItem.picture"
                      show-size
                      counter
                      accept="image/png, image/jpeg, image/jpg"
                      label="Picture"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <v-divider class="mt-10 mb-5" horizontal></v-divider>

                <v-row>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.roleId"
                      label="Status"
                      :items="roleOption"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.subscriptionId"
                      label="Status"
                      :items="subscriptionOption"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" sm="4">
                    <v-autocomplete
                      v-model="editedItem.statusId"
                      label="Status"
                      :items="statusOption"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 pt-10 pb-5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import _ from 'lodash'
import User from '@/api/users'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    roleOption: [],
    statusOption: [],
    subscriptionOption: [],
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'First Name', value: 'firstName' },
      { text: 'Middle Name', value: 'middleName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Email', value: 'email' },
      { text: 'Username', value: 'username' },
      { text: 'Password', value: 'password' },
      { text: 'Google Connect', value: 'googleConnect' },
      { text: 'Apple Connect', value: 'appleConnect' },
      { text: 'Facebook Connect', value: 'facebookConnect' },
      { text: 'Mobile', value: 'mobile' },
      { text: 'Picture', value: 'picture' },
      { text: 'Config', value: 'config' },
      { text: 'Role ID', value: 'roleId' },
      { text: 'Subscription ID', value: 'subscriptionId' },
      { text: 'Status ID', value: 'statusId' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    items: User,
    editedIndex: -1,
    editedItem: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      googleConnect: '',
      appleConnect: '',
      facebookConnect: '',
      mobile: '',
      picture: '',
      config: '',
      roleId: '',
      subscriptionId: '',
      statusId: '',
    },
    defaultItem: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      googleConnect: '',
      appleConnect: '',
      facebookConnect: '',
      mobile: '',
      picture: '',
      config: '',
      roleId: '',
      subscriptionId: '',
      statusId: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? `Add User` : `Edit User`
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>