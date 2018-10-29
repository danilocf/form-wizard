<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="my-input__label"
    >
      {{ label }}:
    </label>
    <input
      v-mask="mask"
      v-validate="rules"
      :type="type"
      :id="id"
      :name="id"
      :value="value"
      :maxlength="max"
      class="my-input"
      @input="$emit('change', $event.target.value)"
      :data-vv-as="label ? label.toLowerCase() : ''"
    >
    <p class="my-input__error">{{ errors.first(id) }}</p>
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
  margin: .2rem 0 0;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: none;
  border: 1px solid #757575;
  color: #424242;
}

.my-input__label {
  font-size: 1.2rem;
}

.my-input__error {
  font-size: 1.1rem;
  color: red;
  margin-top: 6px;
}
</style>
