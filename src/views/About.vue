<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input
      v-mask="'money'"
      v-validate="'required'"
      type="text"
      name="money"
      class="my-input"
    >
    <p>{{ errors.first('money') }}</p>

    <input
      v-mask="'999.999.999-99'"
      v-validate="'required'"
      type="text"
      name="cpf"
      class="my-input"
    >
    <p>{{ errors.first('cpf') }}</p>

    <input
      v-validate="'required|email'"
      type="email"
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
      this.$validator.validate()
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
