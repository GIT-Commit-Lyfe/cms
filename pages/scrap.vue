<template>
  <v-container>
    <div class="text-center mt-5 mb-10">
      <h2>Scrapping</h2>
    </div>
    <v-row>
      <v-col cols="12">
        <v-textarea
          clearable
          outlined
          rows="15"
          name="html"
          label="HTML input"
          v-model="input"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          label="Column ID Header Name"
          placeholder="BrandId"
          outlined
          v-model="headerName"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="ID"
          placeholder="1"
          outlined
          v-model="idValue"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          label="File Name (csv format)"
          placeholder="BrandCollection"
          outlined
          v-model="filename"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn
          @click="getData"
          block
          x-large
          color="primary"
          elevation="2"
        >Get Data</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      input: "",
      headerName: "",
      idValue: "",
      filename: "",
    }
  },
  methods: {
    scrap() {
      let result = this.input.replace(/<.+>/g, ""); // remove html tags
      console.log("RESULT 1", JSON.stringify(result))
      result = result.replace(/\s{2,}/g, "\n"); // replace spaces to \n
      console.log("RESULT 2", JSON.stringify(result))
      result = result.replace(/\n\w\n/g, "\n"); // remove alphabet bookmark
      console.log("RESULT 3", JSON.stringify(result))
      result = result.replace(/&amp;/g, "&"); // replace & char
      console.log("RESULT 4", JSON.stringify(result))
      result = result.substring(1, result.length - 1); // remove first and last \n
      console.log("RESULT 4", JSON.stringify(result))
      console.log(result.split("\n"))
      return result.split("\n");
    },
    getData() {
      const data = this.scrap();
      const ws_data = [["name", this.headerName]];
      data.forEach(item => {
        ws_data.push([item, this.idValue])
      })

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(ws_data);

      const sheetName = this.filename;
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      const filename = this.filename + ".csv";
      XLSX.writeFile(wb, filename, {});
    }
  },
}
</script>

<style>

</style>