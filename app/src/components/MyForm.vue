<template>
  <form @submit.prevent="validate">
    <slot/>

    <button
      type="submit"
      class="my-form__submit"
    >
      <template v-if="$slots.submit">
        <slot name="submit"/>
      </template>
      <template v-else>
        Salvar
      </template>
    </button>

    <slot name="error"/>
  </form>
</template>

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
