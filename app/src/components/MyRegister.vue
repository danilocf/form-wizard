<template>
  <div class="my-register">

    <div class="my-register__header">
      <img
        v-if="formConfig.options.logoUrl"
        :src="formConfig.options.logoUrl"
        :alt="formConfig.options.title"
        class="my-register__logo"
        >
      <h1 class="my-register__title">
        {{ formConfig.options.title }}
      </h1>
    </div>

    <template v-if="configError">
      <div class="my-register__error">{{ configError }}</div>
    </template>
    <template v-else-if="!configError && !formConfig.steps.length">
      <p>Carregando...</p>
    </template>
    <template v-else>
      <!-- STEP -->
      <div
        v-for="(step, stepIndex) in formConfig.steps"
        :key="stepIndex"
      >
        <my-form
          v-if="activeStep === stepIndex"
          @submit="submit(stepIndex)"
        >
          <p class="my-register__step">Passo: {{ stepIndex+1 }} de {{ totalSteps }}</p>
          <h2>{{ step.name }}</h2>

          <!-- STEP'S ITEM -->
          <template v-for="item in step.items">
            <template v-if="item.type !== 'select'">
              <my-input
                :key="item.id"
                v-model="form[stepIndex][item.model]"
                :type="item.type || 'text'"
                :id="item.id"
                :label="item.label"
                :max="item.max || 100"
                :mask="item.mask || ''"
                :rules="item.rules || ''"
              />
            </template>
            <template v-else>
              <select
                :key="item.id"
                v-model="form[stepIndex][item.model]"
                :id="item.id"
                >
                <option
                  v-for="(option, optionIndex) in item.options"
                  :value="option.value"
                  :key="optionIndex"
                  >
                  {{ option.label }}
                </option>
              </select>
            </template>
          </template>

          <span slot="submit">{{ submitText }}</span>

          <template v-if="submitError">
            <div class="my-register__error" slot="error">{{ submitError }}</div>
          </template>

        </my-form>
      </div>
    </template>

  </div>
</template>

<script>
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import Axios from 'axios'

import config from './config.json'

export default {
  components: {
    MyForm,
    MyInput
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
  created() {
    this.generateForm()
  },
  computed: {
    submitText() {
      if (this.activeStep+1 === this.totalSteps) return 'Finalizar'
      return 'Próximo'
    }
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
      this.formConfig = config
      // this.formConfig = await this.getConfig()
      this.form = {}

      this.formConfig.steps.forEach((step, index) => {
        this.$set(this.form, index, {})
        step.items.forEach(item => {
          const model = item.model
          this.$set(this.form[index], model, null)
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

<style lang="scss">
.my-register {
  max-width: 600px;
  margin: auto;
  padding: 8px 8px 24px;
}

.my-register__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
}

.my-register__logo {
  max-width: 100px;
}

.my-register__title {
  text-align: center;
}

.my-register__step {
  text-align: right;
}

.my-register__error {
  color: #DD2C00;
  background-color: lighten(#DD2C00, 40%);
  border: 1.5px solid #DD2C00;
  border-radius: 4px;
  padding: 8px 24px;
  font-weight: bold;
}
</style>
