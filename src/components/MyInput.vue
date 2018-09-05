<template>
  <div>
    <label 
      v-if="label" 
      :for="id"
      class="my-input__label"
      >
      {{ label }}:
      <small>{{ value && value.length }}</small>
    </label>
    <input
      :type="type"
      :id="id"
      class="my-input"
      :value="value"
      @input="$emit('change', $event.target.value)"
      :required="!notRequired"
      :maxlength="max"
      >
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    notRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Object,
      required: false,
      default() { return {} }
    },
    max: {
      type: [String, Number],
      required: false,
      default: 50
    }
  }
}
</script>

<style lang="scss">
.my-input {
  font-size: 1.2rem;
  width: 100%;
  padding: 8px;
  margin: .2rem 0 1rem;
  box-sizing: border-box;
}

.my-input__label {
  font-size: 1.2rem;
}
</style>
