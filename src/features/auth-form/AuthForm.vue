<template>
  <div class="auth" :style="{ 'background-image': `url(${bgUrl})` }">
    <div class="auth__container">
      <email-auth
        v-if="currentView === 'email'"
        ref="email"
        :is-loading="isLoading"
        @set-view="setView"
        @check-email="checkEmail"
        @log-in="logIn"
        @sign-up="signUp"
        @view-changed="error = ''"
      />
      <success-auth v-if="currentView === 'success'" @set-view="setView" />
      <div v-if="error" class="auth__error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import SuccessAuth from '@/features/auth-form/SuccessAuth';
import EmailAuth from '@/features/auth-form/EmailAuth';
import { getFormData, isWebpSupported } from '@/utils';
import ApiMock from '@/api';

const Api = new ApiMock();
export default {
  name: 'AuthForm',
  components: { EmailAuth, SuccessAuth },
  data: () => ({
    views: ['email', 'success'],
    currentView: 'email',
    error: '',
    isLoading: false,
    user: null,
  }),
  computed: {
    bgUrl() {
      return isWebpSupported() ? 'bg.webp' : 'bg.png';
    },
  },
  methods: {
    setView(view) {
      if (this.views.indexOf(view) === -1) return;
      this.currentView = view;
    },
    async checkEmail(email) {
      this.isLoading = true;
      const hasUser = await Api.hasUser(email.trim());
      const view = hasUser ? 'login' : 'signup';
      this.isLoading = false;
      this.$refs.email.setView(view);
    },
    async signUp(event) {
      const data = getFormData(event);
      const { email, password1, password2 } = data;
      if (password1 !== password2) {
        this.error = 'Passwords should be the same';
        return;
      }

      this.error = '';
      this.isLoading = true;
      try {
        this.user = await Api.createUser({
          email,
          password: password1,
        });
      } catch (e) {
        this.error = e;
        return;
      } finally {
        this.isLoading = false;
      }

      this.setView('success');
    },
    async logIn(event) {
      const data = getFormData(event);
      const { email, password } = data;
      this.error = '';
      this.isLoading = true;
      try {
        this.user = await Api.logIn({ email, password });
      } catch (e) {
        this.error = e;
        return;
      } finally {
        this.isLoading = false;
      }
      this.setView('success');
    },
  },
};
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--secondary);
  background-size: cover;
  text-align: left;
}

.auth__container {
  height: fit-content;
  max-width: 300px;
  min-width: 270px;
  padding: 30px;
  background-color: var(--white);
  border-radius: 14px;
}

.auth__error {
  padding: 10px 0 0;
  color: var(--red);
  font-weight: 600;
  text-align: center;
}
</style>
