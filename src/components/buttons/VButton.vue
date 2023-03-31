<template>
  <button
    class="button"
    :type="type"
    :value="value"
    :name="name"
    :disabled="disabled"
    :autofocus="autofocus"
    :aria-label="label"
    :title="label"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'submit',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
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
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.button {
  width: 100%;
  padding: 10px;
  cursor: pointer;
  appearance: none;
  border: 0;
  border-radius: 4px;
  background-color: var(--primary);
  color: var(--white);
  font-size: 16px;
}
.button:focus,
.button:active {
  background-color: var(--primary-darken);
}
.button:hover {
  opacity: 0.9;
}
.button:disabled {
  opacity: 0.7;
  pointer-events: none;
}
</style>
