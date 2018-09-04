<template>
  <form 
    class="my-form" 
    @submit.prevent="submit"
    >

    <pre>{{ form }}</pre>

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
        />
    </template>

  </form>
</template>

<script>
import MyInput from '@/components/MyInput'

export default {
  components: {
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
        }
      ],
      form: {} // auto filled
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
      })
    },

    submit() {
      console.log('submit')
    }
  }
}
</script>

<style>

</style>
