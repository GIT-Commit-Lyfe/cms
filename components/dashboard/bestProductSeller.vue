<template>
  <v-row cols="12">
    <v-col cols="12" md="8" class="mt-4">
      <v-title class="text-h6 font-weight-bold">Best Selling Product</v-title>
      <v-col class="mt-4 table">
        <v-simple-table
          fixed-header
          class="p-2"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Product
                </th>
                <th class="text-left">
                  Boutique
                </th>
                 <th class="text-left">
                  Revenue
                </th>
                <th class="text-left">
                  Ratting
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in bestSeller"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.boutique }}</td>
                <td>{{ item.revenue }}</td>
                <td>{{ item.ratting }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-col>

    <v-col cols="12" md="4" class="mt-4">
      <v-title class="text-h6 font-weight-bold">Best Seller</v-title>
      <v-card class="mx-auto pt-4 my-4" dark outlined color="#26c6da">
        <v-list-item three-line>
          <v-icon class="ml-4 mr-5 text-h2">
            mdi-account-group
          </v-icon>
          <v-list-item-content class="py-5" color="white">
            <div class="text-overline" > Total Member </div>
            <v-list-item-title class="text-h3 mb-1 font-weight-bold">
              10.000
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>

       <v-card class="mx-auto pt-4 my-4" dark outlined color="#26c6da">
        <v-list-item three-line>
          <v-icon class="ml-4 mr-5 text-h2">
            mdi-account-group
          </v-icon>
          <v-list-item-content class="py-5" color="white">
            <div class="text-overline" > Total Member </div>
            <v-list-item-title class="text-h3 mb-1 font-weight-bold">
              10.000
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
  export default {
    data () {
      return {
        bestSeller: [
          {
            name: 'Omega',
            boutique: 'Lorem',
            revenue: '$100.000',
            ratting: '5'
          },
          {
            name: 'Rollex',
            boutique: 'Lorem',
            revenue: '$100.000',
            ratting: '5'
          },
          {
            name: 'L. Leroy',
            boutique: 'Lorem',
            revenue: '$100.000',
            ratting: '5'
          },
           {
            name: 'Cuervo y Sobrinos',
            boutique: 'Lorem',
            revenue: '$100.000',
            ratting: '5'
          }
        ],
      }
    },
  }
</script>


<style scoped>
table th {
  background: blue;
  font-size: 1rem !important;
}
table tr td {
  height: 50px !important;
  font-size: 1rem !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 50px;
}
.table {
  padding: 0;
}
</style>