<template>
  <div class="panel-body w-full">
    <div class="text-center mt-12 mb-8">
      <h1>Caliber Form</h1>
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
        caliber_name: 'lorem lorem lorem',
        brand_id: '',
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
                label: 'Caliber Name',
                model: 'caliber_name',
                required: true,
                validator: 'string',
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Brand ID',
                model: 'brand_id',
                required: true,
                validator: 'string',
              },
              {
                type: 'submit',
                onSubmit(model) {
                  console.log(model)
                },
                label: '',
                buttonText: 'Add Caliber',
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
