<template>
  <div class="panel-body w-full">
    <div class="text-center mt-12 mb-8">
      <h1>Product Form</h1>
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
        referenceId: 1,
        year: '2012',
        price: '',
        description: 'lorem ipsum dolor sir amet',
        top_image: '',
        crown_side_image: '',
        case_back_image: '',
        show_of_image: '',
        conditionId: 1,
        accompanyId: 1,
        storeId: 1,
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
                type: 'select',
                label: 'Reference ID',
                model: 'referenceId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Year',
                model: 'year',
                required: true,
                values: [
                  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                  2020, 2021,
                ],
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Price',
                model: 'price',
                required: true,
              },
              
              {
                type: 'image',
                label: 'Top Image',
                model: 'top_image',
                required: true,
              },
              {
                type: 'image',
                label: 'Crown Side Image',
                model: 'crown_side_image',
                required: true,
              },
              {
                type: 'image',
                label: 'Case Back Image',
                model: 'case_back_image',
                required: true,
              },
              {
                type: 'image',
                label: 'Show of Image',
                model: 'show_of_image',
                required: true,
              },

              {
                type: 'textArea',
                label: 'Description',
                model: 'description',
                max: 500,
                rows: 3,
                hint: 'Max 500 characters',
                placeholder: "Description your product",
                required: true,
                validator: 'string',
              },

              {
                type: 'select',
                label: 'Condition ID',
                model: 'conditionId',
                values: [],
                required: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Accompany ID',
                model: 'accompanyId',
                values: [],
                required: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Store ID',
                model: 'storeId',
                values: [],
                required: true,
                validator: 'string',
              },
              
              {
                type: 'submit',
                onSubmit(model) {
                  console.log(model)
                },
                label: '',
                buttonText: 'Add Product',
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
    api.references.map((e) => this.schema.groups[0].fields[1].values.push(e.id))
    api.conditions.map((e) => this.schema.groups[0].fields[9].values.push(e.id))
    api.accompanies.map((e) => this.schema.groups[0].fields[10].values.push(e.id))
  }
}
</script>
