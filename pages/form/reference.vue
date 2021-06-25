<template>
  <div class="panel-body w-full">
    <div class="text-center mt-12 mb-8">
      <h1>Reference Form</h1>
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
        modelId: 1,
        reference_number: '',
        movementId: 1,
        power_reserve: '',
        caliberId: 1,
        number_of_jevel: '',
        case_material: '',
        case_diameter: '',
        case_thickness: '',
        water_resistance: '',
        bezelMaterialId: 1,
        dialMaterialId: 1,
        dial_numeral: '',
        glass: '',
        braceletMaterialId: 1,
        braceletColorId: 1,
        claspId: 1,
        claspMaterialId: 1,
        functionId: 1,
        street_name: '',
        lug_width: '',
        instroduce_at: '',
        discontinue_at: '',
        other_info: '',
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
                label: 'Model ID',
                model: 'modelId',
                values: [],
                required: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Reference Number',
                model: 'reference_number',
                required: true,
                validator: 'alphaNumeric'
              },
              {
                type: 'select',
                label: 'Movement ID',
                model: 'movementId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Power Reserve (hour)',
                model: 'power_reserve',
                required: true,
                validator: 'number'
              },
              {
                type: 'select',
                label: 'Caliber ID',
                model: 'caliberId',
                values: [],
                readonly: true,
                validator: 'alphaNumeric'
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Number of Jewel',
                model: 'number_of_jewel',
                required: true,
                validator: 'number'
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Case Material',
                model: 'case_material',
                required: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Case Diameter',
                model: 'case_diameter',
                required: true,
                validator: 'number'
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Case Thickness',
                model: 'case_thickness',
                required: true,
                validator: 'number'
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Water Resistance',
                model: 'water_resistance',
                required: true,
                valudator: 'number'
              },

              {
                type: 'select',
                label: 'Bezel Material ID',
                model: 'bezelMaterialId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Dial Material ID',
                model: 'dialMaterialId',
                values: [],
                readonly: true,
                validator: 'string'
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Dial Numeral',
                model: 'dial_nmerald',
                required: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Glass',
                model: 'glass',
                required: true,
                validator: 'string'
              },

              {
                type: 'select',
                label: 'Bracelet Material ID',
                model: 'braceletMaterialId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Bracelet Color ID',
                model: 'braceletColorId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Clasp ID',
                model: 'claspId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Clasp Material ID',
                model: 'claspMaterialId',
                values: [],
                readonly: true,
                validator: 'string'
              },
              {
                type: 'select',
                label: 'Function ID',
                model: 'functionId',
                values: [],
                readonly: true,
                validator: 'string'
              },

              {
                type: 'input',
                inputType: 'text',
                label: 'Street Name',
                model: 'street_name',
                required: true,
                validator: 'string'
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'lug Width',
                model: 'lug_width',
                required: true,
                validator: 'number'
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Introduce At',
                model: 'introduce_at',
                required: true,
                validator: 'date'
              },
              {
                type: 'input',
                inputType: 'date',
                label: 'Discontinue At',
                model: 'Discontinue_at',
                required: true,
                validator: 'date'
              },
              {
                type: 'textArea',
                label: 'Other Info',
                model: 'other_info',
                max: 500,
                rows: 3,
                hint: 'Max 500 characters',
                placeholder: "Other description product",
                required: true,
              },

              {
                type: 'submit',
                onSubmit(model) {
                  console.log(model)
                },
                label: '',
                buttonText: 'Add Reference',
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
    api.models.map((e) => this.schema.groups[0].fields[1].values.push(e.id))
    api.movements.map((e) => this.schema.groups[0].fields[3].values.push(e.id))
    api.calibers.map((e) => this.schema.groups[0].fields[5].values.push(e.id))
    api.bazel_materials.map((e) => this.schema.groups[0].fields[11].values.push(e.id))
    api.dial_materials.map((e) => this.schema.groups[0].fields[12].values.push(e.id))
    api.bracelet_materials.map((e) => this.schema.groups[0].fields[15].values.push(e.id))
    api.bracelet_colors.map((e) => this.schema.groups[0].fields[16].values.push(e.id))
    api.clasps.map((e) => this.schema.groups[0].fields[17].values.push(e.id))
    api.clasp_materials.map((e) => this.schema.groups[0].fields[18].values.push(e.id))
    api.functions.map((e) => this.schema.groups[0].fields[19].values.push(e.id))
  }
}

</script>
