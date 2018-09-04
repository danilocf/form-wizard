<template>
  <form
    class="my-form" 
    @submit.prevent="$emit('submit')"
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

<script>
export default {
  name: 'my-form'
}
</script>

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
