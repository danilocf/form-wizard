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
      :data-vv-as="label ? label.toLowerCase() : ''"
      class="my-input"
      @input="$emit('change', $event.target.value)"
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
  props: [
    'value',
    'type',
    'id',
    'label',
    'error',
    'max',
    'mask',
    'rules'
  ]
}
</script>
