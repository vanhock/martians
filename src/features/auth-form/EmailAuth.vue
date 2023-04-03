<template>
    <form
      class="email-steps"
      @submit.prevent="handleFormSubmit"
    >
      <template v-if="currentView === 'email'">
        <h1-text>Log in or sign up</h1-text>
        <p-text
        >We'll check if you have an account, and help create one if you
          don't.</p-text
        >
        <p-text class="auth__description"
        >For test login, use email: <b>test@gmail.com</b>, password:
          <b>Test911</b>.</p-text
        >
      </template>
      <template v-if="currentView === 'login'">
        <div class="email-steps__title">
          <button type="button" class="back-button" @click="setView('email')">
            <back-icon />
          </button>
          <h1-text>Finish logging in</h1-text>
        </div>
        <p-text>Once you enter the password, you'll be all logged in.</p-text>
      </template>

      <template v-if="currentView !== 'signup'">
        <v-input
            id="username"
            v-model="formEmail"
            type="text"
            autocomplete="username"
            input-mode="email"
            name="email"
            label="Email (personal or work)"
            placeholder="mark@example.com"
            :disabled="isLoading"
            :pattern="validationPatterns.email"
            autofocus
            required
        />
        <v-input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            :disabled="isLoading"
            :pattern="validationPatterns.password"
            autofocus
            :required="currentView === 'login'"
        />

        <v-button class="button" :disabled="isLoading">Continue</v-button>
      </template>

      <template v-if="currentView === 'signup'">
        <div class="email-steps__title">
          <button type="button" class="back-button" @click="setView('email')">
            <back-icon />
          </button>
          <h1-text>Create your account</h1-text>
        </div>
        <p-text
        >You're creating a Martians Form account using {{ formEmail }}</p-text
        >
        <v-input
            id="username"
            v-model="formEmail"
            type="email"
            autocomplete="username"
            name="email"
            label="Email (personal or work)"
            placeholder="mark@example.com"
            :disabled="isLoading"
            :pattern="validationPatterns.email"
            autofocus
            required
            hidden
        />
        <v-input
            ref="signupPassword"
            label="Password"
            name="password1"
            type="password"
            placeholder="Enter password"
            :disabled="isLoading"
            :pattern="validationPatterns.password"
            autofocus
            required
        />
        <v-input
            label="Retype password"
            name="password2"
            type="password"
            placeholder="Enter password again"
            :pattern="validationPatterns.password"
            :disabled="isLoading"
            required
        />
        <v-button class="button" :disabled="isLoading">Create account</v-button>
      </template>
    </form>
</template>

<script>
import PText from '@/components/typograthy/PText';
import VInput from '@/components/inputs/VInput';
import VButton from '@/components/buttons/VButton';
import H1Text from '@/components/typograthy/H1Text';
import BackIcon from '@/components/icons/backIcon';
export default {
  name: 'EmailAuth',
  components: { BackIcon, H1Text, VButton, VInput, PText },
  props: {
    userEmail: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['check-email', 'set-view', 'sign-up', 'log-in', 'view-changed'],
  data: () => ({
    formEmail: '',
    views: ['email', 'login', 'signup'],
    currentView: 'email',
    validationPatterns: {
      password: '^.{6,}$',
      email: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    },
  }),
  methods: {
    handleFormSubmit(event) {
      switch (this.currentView) {
        case 'email':
          this.$emit('check-email', this.formEmail);
          break;
        case 'signup':
          this.$emit('sign-up', event);
          break;
        case 'login':
          this.$emit('log-in', event);
      }
    },
    setView(view) {
      if (this.views.indexOf(view) === -1) return;
      this.currentView = view;
      this.$emit('view-changed');
    },
  },
};
</script>

<style scoped>
.auth__description {
  margin-bottom: 25px;
  padding: 10px;
  background-color: var(--highlight);
  border-radius: 4px;
  font-size: 12px;
}
.email-steps__title {
  display: flex;
  align-items: center;
}
.back-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: -10px;
  appearance: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
</style>
