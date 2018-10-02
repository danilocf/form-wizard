<template>
  <div>
    <input
      v-validate="'required'"
      v-model="text"
      type="text"
      name="text"
    >
    <p>{{ errors.first('text') }}</p>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  data() {
    return {
      text: null
    }
  }
}
</script>
