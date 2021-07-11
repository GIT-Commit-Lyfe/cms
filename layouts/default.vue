<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" v-model="drawer" fixed app>
      <template>
        <v-list-item to="/profile" class="my-8">
          <v-col class="justify-center items-center">
            <v-list-item-avatar class="mb-2">
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Hello Admin
              </v-list-item-title>
              <v-list-item-subtitle>admin@mail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
        </v-list-item>

        <v-list v-for="(menu, i) in menu" :key="i" class="py-1">
          <v-list-item v-if="!menu.subMenu" :to="menu.to" >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title size="14">{{ menu.title }}</v-list-item-title>
          </v-list-item>

          <v-list-group v-else :prepend-icon="menu.icon">
            <template v-slot:activator >
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(subMenu, i) in menu.subMenu"
              :key="i"
              :to="subMenu.to"
              link
            >
              <v-list-item-icon>
                <!-- <v-icon v-text="subMenu.icon"></v-icon> -->
              </v-list-item-icon>
              <v-list-item-title
                v-text="subMenu.title"
                size="13"
              ></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar fixed app color="deep-silver">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" class="lightbrown" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menu: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-file-table-box-multiple',
          title: 'Table',
          to: '/table'
        },
        {
          icon: 'mdi-google-spreadsheet',
          title: 'Seed CSV',
          to: '/seed-csv',
        },
        {
          icon: 'mdi-buffer',
          title: 'Transaction',
          to: '/transaction',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'User',
          to: '/user',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dashboard',
    }
  },
}
</script>

<style scoped>
.v-main {
  background-color: #fafafa;
}

.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  font-size: 14px !important;
}
.v-icon.v-icon {
  font-size: 22px;
}
.v-list-item__action,
.v-list-item__avatar,
.v-list-item__icon {
  font-size: 20px;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background: #ffffff;
}
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none;
  border-bottom: 1px solid #f1f1f1;
}
</style>