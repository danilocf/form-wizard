<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input
      type="text"
      v-mask="'money'"
      v-validate="'required'"
      name="money"
      class="my-input"
      >
    <p>{{ errors.first('money') }}</p>

    <input
      type="text"
      v-mask="'999.999.999-99'"
      v-validate="'required'"
      name="cpf"
      class="my-input"
      >
    <p>{{ errors.first('cpf') }}</p>

    <input
      type="email"
      v-validate="'required|email'"
      name="email"
      >
    <p>{{ errors.first('email') }}</p>

    <test-input/>

    <button @click.prevent="submit">SUBMIT</button>
  </div>
</template>

<script>
import AwesomeMask from 'awesome-mask'
import TestInput from '@/components/TestInput'

export default {
  directives: {
    'mask': AwesomeMask
  },
  components: {
    TestInput
  },
  data() {
    return {
      value: 0
    }
  },
  methods: {
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
          console.log(JSON.stringify(this.$data, null, '\t'))
        }
      })
    }
  }
}
</script>

<style lang="scss">
.about {
  padding: 24px;

  * {
    box-sizing: border-box;
  }

  input,
  button,
  p {
    width: 100%;
    padding: 24px;
    font-size: 24px;
    margin: 16px 0;
  }

  p {
    margin: 0;
    padding: 0;
    color: red;
  }
}
</style>
