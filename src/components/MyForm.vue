<template>
  <form
    class="my-form"
    @submit.prevent="validate"
  >

    <slot/>

    <button
      type="submit"
      class="my-form__submit"
    >
      Submit
    </button>

  </form>
</template>

<style lang="scss">
.my-form {
  max-width: 600px;
  margin: 0 auto;
}

.my-form__submit {
  font-size: 1.4rem;
  width: 100%;
  background: lightgreen;
  padding: 1rem;
  margin: 1.5rem 0;
}
</style>

<script>
export default {
  methods: {
    validate() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$emit('submit')
        }
      })
    }
  }
}
</script>
