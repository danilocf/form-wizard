<template>
  <div>
    <label
      v-if="label"
      class="my-input__label"
    >
      {{ label }}:
    </label>

    <div
      v-for="(option, optionIndex) in options"
      :key="optionIndex"
    >
      <input
        v-validate="rules"
        :id="option.value"
        :name="id"
        :value="option.value"
        :checked="option.value === value"
        type="radio"
        @change="$emit('change', $event.target.value)"
      >
      <label
        :for="option.value"
        class="my-radio__label"
      >
        {{ option.label }}
      </label>
    </div>

    <p class="my-input__error">{{ errors.first(id) }}</p>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: [
    'value',
    'id',
    'label',
    'error',
    'rules',
    'options'
  ]
}
</script>
