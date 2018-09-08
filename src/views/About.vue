<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input 
      type="text" 
      v-mask="'money'"
      class="my-input"
      >

    <input 
      type="text" 
      v-mask="'999.999.999-99'"
      class="my-input"
      >
  </div>
</template>

<script>
import AwesomeMask from 'awesome-mask'

export default {
  directives: {
    'mask': AwesomeMask
  },
  data() {
    return {
      value: 0
    }
  }
}
</script>
