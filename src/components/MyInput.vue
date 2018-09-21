<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="my-input__label"
      >
      <span v-if="label">{{ label }}:</span>
    </label>
    <input
      :type="type"
      :id="id"
      :name="id"
      class="my-input"
      :value="value"
      @input="$emit('change', $event.target.value)"
      :maxlength="max"
      v-mask="mask"
      v-validate="rules"
      autocomplete="off"
      >
    <p class="my-input_error">{{ errors.first(id) }}</p>
  </div>
</template>

<script>
import AwesomeMask from 'awesome-mask'

export default {
  inject: ['$validator'],
  directives: {
    'mask': AwesomeMask
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    error: {
      type: Object,
      required: false,
      default() { return {} }
    },
    max: {
      type: [String, Number],
      required: true
    },
    mask: {
      type: String,
      required: false,
      default: ''
    },
    rules: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.my-input {
  font-size: 1.2rem;
  width: 100%;
  padding: 8px;
  margin: .2rem 0;
  box-sizing: border-box;
}

.my-input__label {
  font-size: 1.2rem;
}

.my-input_error {
  font-size: 1.1rem;
  color: red;
}
</style>
