<template>
  <div class="success-auth">
    <h1-text>🎉 Congratulation</h1-text>
    <p-text>You're finally here!</p-text>
    <p-text
      >If <b>you enjoy</b>, would be great to
      <a ref="link" href="mailto:vanhocker@gmail.com">send me</a> another
      challenges.</p-text
    >
    <v-button class="button" @click="sendEmail">Here we go!</v-button>
  </div>
</template>

<script>
import H1Text from '@/components/typograthy/H1Text';
import VButton from '@/components/buttons/VButton';
import PText from '@/components/typograthy/PText';
export default {
  name: 'SuccessAuth',
  components: { PText, VButton, H1Text },
  methods: {
    sendEmail() {
      this.$refs.link.click();
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 15px;
}
</style>
