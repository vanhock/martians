<template>
  <h2 class="h2"><slot /></h2>
</template>

<script>
export default {
  name: 'H2Text',
};
</script>

<style scoped>
.h2 {
  display: inline;
  font-size: 18px;
}
</style>
