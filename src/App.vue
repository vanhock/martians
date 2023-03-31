<template>
  <auth-form />
</template>

<script>
import AuthForm from '@/features/auth-form/AuthForm';

export default {
  name: 'App',
  components: {
    AuthForm,
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;

  --primary: #0658ab;
  --primary-darken: #074a8d;
  --secondary: #132e35;
  --font-color: #2c3e50;
  --font-color-secondary: #fff;
  --white: #fff;
  --red: #ff0007;
  --highlight: beige;
  --border-color: #6da1d0;
  --border-color-darken: #0658ab;
}
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
}
</style>
