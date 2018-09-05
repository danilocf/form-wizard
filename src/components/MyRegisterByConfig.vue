<template>
  <my-form @submit="submit">

    <pre>{{ form }}</pre><hr>

    <template
      v-for="conf in formConfig"
      >
      {{ conf }}
      <my-input
        v-model="form[conf.model]"
        :type="conf.type || 'text'"
        :id="conf.id"
        :label="conf.label"
        :key="conf.id"
        :error="errors[conf.model]"
        :max="conf.max || 50"
        />
    </template>

  </my-form>
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
      this.formConfig.forEach(conf => {
        const model = conf.model
        this.$set(this.form, model, null)
        this.$set(this.errors, model, {})
      })
    },

    submit() {
      console.log(JSON.stringify(this.form, null, '\t'))
    }
  }
}
</script>
