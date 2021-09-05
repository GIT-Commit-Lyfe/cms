<template>
  <v-autocomplete
    v-model="value"
    :items="optionLabels"
    :label="label"
  ></v-autocomplete>
</template>

<script>
export default {
  props: [
    "model",
    "modelId",
  ],
  data() {
    return {
      value: "",
      options: [],
      optionLabels: [],
    }
  },
  watch: {
    model: function () {
      this.fetchOptions();
    },
    modelId: function () {
      this.findOption();
    },
    value: function () {
      this.$emit("updateItem", { model: this.model, payload: this.selectedOptions.id || -1 });
    }
  },
  async mounted() {
    await this.fetchOptions();
    this.findOption();
  },
  computed: {
    label() {
      return this.fromCamelUppercaseToLabel(this.model);
    },
    selectedOptions() {
      return this.options.find((item) => {
        return item.name === this.value;
      }) || {};
    }
  },
  methods: {
    // api
    async fetchOptions() {
      try {
        const modelName = this.model.replace("Id", "");
        const { data } = await this.$axios.get(`/api/cms/${modelName}`);
        this.options = _.cloneDeep(data);
        this.optionLabels = this.options.map((item) => item.name);
      } catch (err) {
        console.log(err);
      }
    },

    findOption() {
      if (!this.modelId || this.modelId === -1) {
        this.value = "";
      } else {
        const foundOne = this.options.find((item) => item.id === this.modelId);
        this.value = foundOne ? foundOne.name : "";
      }
    },
    fromCamelUppercaseToLabel(text) {
      const camel = text.charAt(0).toLowerCase() + text.slice(1);
      const result = camel.replace(/([A-Z])/g, " $1");
      return result.charAt(0).toUpperCase() + result.slice(1);
    },
  }
}
</script>