<template>
  <div class="password-reset-confirmation">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card  my-5">
            <article class="card-body">
              <locale-changer></locale-changer>
              <h4 class="card-title text-center mb-4 mt-1">Reset password</h4>
              <hr />
              <p class="text-success text-center" v-if="submitStatus === 'OK'">
                Thanks for your submission!
              </p>
              <p class="text-danger text-center" v-if="submitStatus === 'ERROR'">
                {{ errorMessage }}
              </p>
              <p class="text-primary text-center" v-if="submitStatus === 'PENDING'">
                Sending...
              </p>
              <form @submit.prevent="submit">
                <div class="form-group">
                  <div
                    :class="{
                      'input-group': true,
                      'form-group-error': $v.password.$error,
                    }"
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      name=""
                      class="form-control"
                      placeholder="New password"
                      type="password"
                      v-model.trim="$v.password.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.password.required">
                    {{ $t('form.validation.required') }}
                  </small>
                </div>
                <div class="form-group">
                  <div
                    :class="{
                      'input-group': true,
                      'form-group-error': $v.passwordRepeat.$error,
                    }"
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      name=""
                      class="form-control"
                      placeholder="Confirm new password"
                      type="password"
                      v-model.trim="$v.passwordRepeat.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.passwordRepeat.required">
                    {{ $t('form.validation.required') }}
                  </small>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="submitStatus === 'PENDING'">
                    Save Password
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import LocaleChanger from '../components/LocaleChanger';
import accountService from '../services/account.service';

export default {
  name: 'password-reset-confirmation',
  components: { LocaleChanger },
  data() {
    return {
      token: null,
      password: '',
      passwordRepeat: '',
      submitStatus: null,
      errorMessage: null,
    };
  },
  validations: {
    password: {
      required,
    },
    passwordRepeat: {
      required,
    },
  },
  async beforeMount() {
    const token = this.$route.query.token;
    if (token) {
      this.token = token;

      // Uncomment if you want to hide token
      // let query = Object.assign({}, this.$route.query);
      // delete query.token;
      // this.$router.replace({ query });
    } else {
      this.$router.push({
        name: 'page-not-found',
      });
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = 'PENDING';
        try {
          const result = accountService.passwordResetConfirmation(this.token, this.password, this.passwordRepeat);
          this.submitStatus = 'OK';
        } catch (e) {
          this.submitStatus = 'ERROR';
        }

        let email = this.email;
      }
    },
  },
};
</script>

<style scoped></style>
