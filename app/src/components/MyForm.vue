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

<style lang="scss">
.my-form__submit {
  color: #ffffff;
  font-size: 1.2rem;
  background-color: #01579B;
  border-radius: 8px;
  width: 100%;
  padding: 1rem;
  margin: 1.5rem 0;
  cursor: pointer;

  &:hover {
    background-color: lighten(#01579B, 10%);
  }
}
</style>
