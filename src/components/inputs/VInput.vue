<template>
  <div class="input" :data-hidden="hidden ? 'true' : undefined" :inert="hidden">
    <label v-if="label" :for="`input_${name}`">{{ label }}</label>
    <input
      :id="`input_${name}`"
      ref="input"
      :type="type"
      :value="modelValue"
      :name="name"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      :pattern="pattern"
      :placeholder="placeholder"
      :autocomplete="autocomplete || type"
      :inputmode="inputMode || type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    name: {
      type: String,
      default: '',
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    pattern: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    hidden: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: ''
    },
    inputMode: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  mounted() {
    if (this.autofocus) this.$refs.input.focus();
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  margin-bottom: 15px;
}
.input[data-hidden] {
  position: absolute;
  display: inline;
  opacity: 0;
  z-index: -10;
}
.input input {
  width: 100%;
  min-width: 8px;
  box-sizing: border-box;
  outline: none;
  padding: 10px 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--font-color);
  font-size: 16px;
}
.input input:focus {
  border-color: var(--border-color-darken);
}

.input label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
}
.input input:disabled {
  pointer-events: none;
  opacity: 0.7;
}
</style>
