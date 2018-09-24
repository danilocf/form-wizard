<template>
  <div class="container">

    <my-form @submit="submit">
      <pre>{{ form }}</pre><hr>

      <!-- STEP -->
      <div
        v-for="(step, index) in formConfig.steps"
        :key="index"
      >
        <h1>{{ step.name }}</h1>

        <!-- STEP'S ITEM -->
        <template v-for="item in step.items">
          <!-- <p>{{ item }}</p> -->
          <my-input
            :key="item.id"
            v-model="form[item.model]"
            :type="item.type || 'text'"
            :id="item.id"
            :label="item.label"
            :error="errors[item.model]"
            :max="item.max || 100"
            :mask="item.mask || ''"
            :rules="item.rules || ''"
          />
        </template>
      </div>
    </my-form>

  </div>
</template>

<script>
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import config from './config.json'

export default {
  components: {
    MyForm,
    MyInput
  },
  data() {
    return {
      temp: null,

      formConfig: config,
      // auto filled
      form: {},
      errors: {}
    }
  },
  created() {
    this.generateForm()
  },
  methods: {
    generateForm() {
      this.form = {}
      this.errors = {}

      this.formConfig.steps.forEach(step => {
        step.items.forEach(item => {
          const model = item.model
          this.$set(this.form, model, null)
          this.$set(this.errors, model, {})
        })
      })
    },

    submit() {
      console.log(JSON.stringify(this.form, null, '\t'))
    }
  }
}
</script>
