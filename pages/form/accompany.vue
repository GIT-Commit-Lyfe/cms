<template>
  <div class="panel-body w-full">
    <div class="text-center mt-12 mb-8">
      <h1>Accompany Form</h1>
    </div>
    <form>
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      >
      </vue-form-generator>
    </form>
    {{ model }}
  </div>
</template>



<script>
export default {
  data() {
    return {
      model: {
        id: 1,
        accompany_name: '',
      },

      schema: {
        groups: [
          {
            fields: [
              {
                type: 'input',
                inputType: 'number',
                label: 'ID',
                model: 'id',
                readonly: true,
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Accompany Name',
                model: 'accompany_name',
                required: true,
                validator: 'string',
              },
              {
                type: 'submit',
                onSubmit(model) {
                  console.log(model)
                },
                label: '',
                buttonText: 'Add Accompany',
                validateBeforeSubmit: true,
              },
            ],
          },
        ],
      },

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },
}
</script>

<style scoped>

.v-application .error {
  background-color: none !important;
}

</style>