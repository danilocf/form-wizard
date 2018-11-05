<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="my-input__label"
    >
      {{ label }}:
    </label>

    <select
      v-validate="rules"
      :key="id"
      :id="id"
      :name="id"
      :value="value"
      class="my-select"
      @change="$emit('change', $event.target.value)"
    >
      <option
        v-for="(option, optionIndex) in options"
        :value="option.value"
        :key="optionIndex"
        :selected="option.value === defaultOption"
      >
        {{ option.label }}
      </option>
    </select>

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
    'options',
    'defaultOption'
  ]
}
</script>
