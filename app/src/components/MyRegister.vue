<template>
  <div class="my-register">

    <!-- REGISTER'S HEADER -->
    <div class="my-register__header">
      <!-- HEADER'S IMAGE -->
      <img
        v-if="formConfig.options.logoUrl"
        :src="formConfig.options.logoUrl"
        :alt="formConfig.options.title"
        class="my-register__logo"
      >
      <!-- HEADER'S TITLE -->
      <h1 class="my-register__title">
        {{ formConfig.options.title }}
      </h1>
    </div>

    <!-- ERROR IN CONFIG -->
    <template v-if="configError">
      <div class="my-register__error">{{ configError }}</div>
    </template>

    <!-- CONFIG IS LOADING -->
    <template v-else-if="!configError && !formConfig.steps.length">
      <p>Carregando...</p>
    </template>

    <!-- COFIG OK -->
    <template v-else>
      <!-- REGISTER'S STEP -->
      <div
        v-for="(step, stepIndex) in formConfig.steps"
        :key="stepIndex"
      >
        <!-- STEP'S FORM -->
        <MyForm
          v-if="activeStep === stepIndex"
          @submit="submit(stepIndex)"
          >

          <!-- SETP'S INFOS -->
          <p class="my-register__step">Passo: {{ stepIndex+1 }} de {{ totalSteps }}</p>
          <h2>{{ step.name }}</h2>

          <!-- STEP'S ITENS -->
          <template v-for="item in step.items">

            <!-- TYPE SELECT -->
            <template v-if="item.type === 'select'">
              <MySelect
                :key="item.id"
                v-model="form[stepIndex][item.id]"
                :id="item.id"
                :label="item.label"
                :rules="item.rules || ''"
                :options="item.options || []"
                :defaultOption="item.defaultOption"
                />
            </template>

            <!-- TYPE RADIO -->
            <template v-else-if="item.type === 'radio'">
              <MyRadio
                :key="item.id"
                v-model="form[stepIndex][item.id]"
                :id="item.id"
                :label="item.label"
                :rules="item.rules || ''"
                :options="item.options || []"
                />
            </template>

            <!-- TYPE INPUT -->
            <template v-else>
              <MyInput
                :key="item.id"
                v-model="form[stepIndex][item.id]"
                :type="item.type || 'text'"
                :id="item.id"
                :label="item.label"
                :max="item.max || 100"
                :mask="item.mask || ''"
                :rules="item.rules || ''"
              />
            </template>
          </template>

          <!-- STEP'S SUBMIT -->
          <span slot="submit">{{ submitText }}</span>

          <!-- STEP'S ERROR ALERT -->
          <template v-if="submitError">
            <div
              slot="error"
              class="my-register__error"
            >
              {{ submitError }}
            </div>
          </template>

        </MyForm>
      </div>
    </template>

  </div>
</template>

<script>
import MyForm from '@/components/Form/MyForm'
import MyInput from '@/components/Inputs/MyInput'
import MySelect from '@/components/Inputs/MySelect'
import MyRadio from '@/components/Inputs/MyRadio'
import mock from '../mock.json'
import Axios from 'axios'

export default {
  components: {
    MyForm,
    MyInput,
    MySelect,
    MyRadio
  },
  data() {
    return {
      activeStep: 0,
      totalSteps: null,
      formConfig: { steps: [], options: { title: 'Carregando...' } }, // filled by api
      form: {}, // auto filled
      configError: null,
      submitError: null
    }
  },
  computed: {
    submitText() {
      if (this.activeStep+1 === this.totalSteps) return 'Finalizar'
      return 'Próximo'
    }
  },
  created() {
    this.generateForm()
  },
  methods: {
    async getConfig() {
      try {
        const { data } = await Axios.get('http://localhost:3000/config')
        console.log('data', JSON.stringify(data))
        if (data && data.length) {
          return data[0]
        }

      } catch (error) {
        console.log('error', error)
        this.configError = 'Erro ao tentar encontrar os campos do formulário'
        return { steps: [], options: { title: 'Ops...' } }
      }
    },

    async generateForm() {
      // this.formConfig = await this.getConfig()
      this.formConfig = mock

      this.form = {}

      this.formConfig.steps.forEach((step, index) => {
        this.$set(this.form, index, {})

        step.items.forEach(item => {
          const typesWithDefaultOption = ['select', 'radio']
          const model = item.id

          this.$set(this.form[index], model, null)

          if (typesWithDefaultOption.indexOf(item.type) > -1 && item.defaultOption) {
            this.form[index][model] = item.defaultOption
          }
        })
      })

      this.totalSteps = this.formConfig.steps.length
    },

    async submit(index) {
      console.log(JSON.stringify(this.form[index], null, '\t'))

      if (index+1 < this.totalSteps) {
        this.activeStep = index+1

      } else {
        // TODO: improve
        // const sendData = {
        //   email: this.form[0].email,
        //   password: this.form[0].password,
        //   cpf: this.form[1].cpf,
        //   cellphone: this.form[1].cellphone,
        //   lala: this.form[1].lala,
        // }
        const sendData = this.form

        try {
          const { data } = await Axios.post('http://localhost:3000/user', sendData)
          console.log('data', JSON.stringify(data))

        } catch (error) {
          console.log('error', error)
          this.submitError = 'Erro ao tentar salvar os dados'
        }
      }
    }
  }
}
</script>
