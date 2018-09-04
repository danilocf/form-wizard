<template>
  <my-form @submit="submit">

    <pre>{{ form }}</pre><hr>

    <template
      v-for="conf in configForm"
      >
      {{ conf }}
      <my-input
        v-model="form[conf.model]"
        :type="conf.type || 'text'"
        :id="conf.id"
        :label="conf.label"
        :key="conf.id"
        :error="errors[conf.model]"
        />
    </template>

  </my-form>
</template>

<script>
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'

export default {
  components: {
    MyForm,
    MyInput
  },
  data() {
    return {
      configForm: [
        {
          model: 'username',
          id: 'username',
          label: 'Username'
        },
        {
          model: 'email',
          id: 'email',
          label: 'Email',
          type: 'email'
        },
        {
          model: 'cellphone',
          id: 'cellphone',
          label: 'Cellphone'
        }
      ],
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
      this.configForm.forEach(conf => {
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
