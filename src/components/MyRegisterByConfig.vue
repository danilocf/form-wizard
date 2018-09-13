<template>
  <div class="container">

    <div
      v-for="(step, index) in formConfig.steps"
      :key="index"
    >
      <h1>{{ step.name }}</h1>

      <template v-for="item in step.items">
        <my-input
          v-model="temp"
          :type="item.type || 'text'"
          :id="item.id"
          :label="item.label"
          :key="item.id"
          :error="errors[item.model]"
          :max="item.max || 100"
          />
      </template>
    </div>

    <!-- <pre>{{ form }}</pre><hr> -->

    <!-- <my-form @submit="submit">
    </my-form> -->
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
    // this.generateForm()
  },
  methods: {
    // generateForm() {
    //   this.formConfig.forEach(conf => {
    //     const model = conf.model
    //     this.$set(this.form, model, null)
    //     this.$set(this.errors, model, {})
    //   })
    // },

    submit() {
      console.log(JSON.stringify(this.form, null, '\t'))
    }
  }
}
</script>

<style lang="scss">
.container {
  width: 600px;
  margin: 16px auto;
}
</style>
