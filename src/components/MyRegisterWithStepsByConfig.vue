<template>
  <div class="container">

    <pre>{{ form }}</pre><hr>

    <!-- STEP -->
    <div
      v-for="(step, index) in formConfig.steps"
      :key="index"
    >
      <my-form @submit="submit(index)">
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
      form: {}
    }
  },
  created() {
    this.generateForm()
  },
  methods: {
    generateForm() {
      this.form = {}

      this.formConfig.steps.forEach((step, index) => {
        this.$set(this.form, index, {})
        step.items.forEach(item => {
          const model = item.model
          this.$set(this.form[index], model, null)
        })
      })
    },

    submit(index) {
      console.log(JSON.stringify(this.form[index], null, '\t'))
    }
  }
}
</script>
