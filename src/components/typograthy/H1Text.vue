<template>
  <h1 class="h1"><slot /></h1>
</template>

<script>
export default {
  name: 'H1Text',
};
</script>

<style scoped>
.h1 {
  margin: 0;
  display: inline;
  font-size: 27px;
}
</style>
