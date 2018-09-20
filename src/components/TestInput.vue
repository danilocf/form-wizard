<template>
  <div>
    <input
      type="text"
      v-validate="'required'"
      name="text"
      >
    <p>{{ errors.first('text') }}</p>
  </div>
</template>

<script>
export default {
  props: []
}
</script>
