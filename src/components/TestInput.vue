<template>
  <div>
    <input
      type="text"
      v-model="text"
      v-validate="'required'"
      name="text"
      >
    <p>{{ errors.first('text') }}</p>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  props: [],
  data() {
    return {
      text: null
    }
  }
}
</script>
