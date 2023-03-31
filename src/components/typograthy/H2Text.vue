<template>
  <h1 class="h1"><slot /></h1>
</template>

<script>
export default {
  name: "H1Text",
};
</script>

<style scoped>
.h1 {
  display: inline;
}
</style>
