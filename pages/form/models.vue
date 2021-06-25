<template>
  <div class="panel-body w-full">
    <div class="text-center mt-12 mb-8">
      <h1>Models Form</h1>
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
import api from '@/API/api.json';
  
export default {
  data() {
    return {
      model: {
        id: 1,
        model_name: '',
        brandId: '',
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
                label: 'Model Name',
                model: 'model_name',
                required: true,
                validator: 'string',
              },
              {
                type: 'select',
                label: 'Brand ID',
                model: 'brandId',
                required: true,
                values: [],
                validator: 'string',
              },
              {
                type: 'submit',
                onSubmit(model) {
                  console.log(model)
                },
                label: '',
                buttonText: 'Add Model',
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

  mounted() {
    api.brands.map((b) => this.schema.groups[0].fields[2].values.push(b.id))
  }
}
</script>
