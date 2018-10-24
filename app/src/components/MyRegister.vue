<template>
  <div class="container">

    <pre>{{ form }}</pre><hr>

    <!-- STEP -->
    <div
      v-for="(step, index) in formConfig.steps"
      :key="index"
    >
      <my-form
        v-if="activeStep === index"
        @submit="submit(index)"
      >
        <p>Step: {{ index+1 }} of {{ totalSteps }}</p>
        <h1>{{ step.name }}</h1>

        <!-- STEP'S ITEM -->
        <template v-for="item in step.items">
          <!-- <p>{{ item }}</p> -->
          <my-input
            :key="item.id"
            v-model="form[index][item.model]"
            :type="item.type || 'text'"
            :id="item.id"
            :label="item.label"
            :max="item.max || 100"
            :mask="item.mask || ''"
            :rules="item.rules || ''"
          />
        </template>

      </my-form>
    </div>

  </div>
</template>

<script>
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import Axios from 'axios'

export default {
  components: {
    MyForm,
    MyInput
  },
  data() {
    return {
      activeStep: 0,
      totalSteps: null,
      formConfig: {},
      // auto filled
      form: {}
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
        return { steps: [] }
      }
    },

    async generateForm() {
      this.formConfig = await this.getConfig()
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
        const sendData = {
          email: this.form[0].email,
          password: this.form[0].password,
          cpf: this.form[1].cpf,
          cellphone: this.form[1].cellphone,
          lala: this.form[1].lala,
        }

        try {
          const { data } = await Axios.post('http://localhost:3000/user', sendData)
          console.log('data', JSON.stringify(data))

        } catch (error) {
          console.log('error', error)
        }
      }
    }
  }
}
</script>
