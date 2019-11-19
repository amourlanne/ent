<template>
  <div class="password-reset">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card  my-5">
            <article class="card-body">
              <locale-changer></locale-changer>
              <h4 class="card-title text-center mb-4 mt-1">Reset password</h4>
              <p class="text-center">
                Please enter your email address to request a password reset.
              </p>
              <hr />
              <p class="text-success text-center" v-if="submitStatus === 'OK'">
                Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.
              </p>
              <p class="text-danger text-center" v-if="submitStatus === 'ERROR'">
                {{ errorMessage }}
              </p>
              <p class="text-primary text-center" v-if="submitStatus === 'PENDING'">
                Sending...
              </p>
              <form @submit.prevent="submit" v-if="submitStatus !== 'OK'">
                <div class="form-group">
                  <div
                    :class="{
                      'input-group': true,
                      'form-group-error': $v.email.$error,
                    }"
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      name=""
                      class="form-control"
                      placeholder="Email address"
                      type="email"
                      v-model.trim="$v.email.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.email.required">
                    {{ $t('form.validation.required') }}
                  </small>
                  <small class="form-error form-text text-danger" v-if="!$v.email.email">
                    invalid email
                  </small>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="submitStatus === 'PENDING'">
                    Reset password
                  </button>
                </div>
              </form>
              Already have login and password? <router-link :to="{ name: 'login' }">Sign in</router-link>
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
  name: 'password-reset',
  components: { LocaleChanger },
  data() {
    return {
      email: '',
      submitStatus: null,
      errorMessage: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = 'PENDING';

        const email = this.email;
        try {
          const emailInfo = await accountService.passwordReset(email);
          this.submitStatus = 'OK';
        } catch (e) {
          // console.log(e);
          this.errorMessage = e.message;
          this.submitStatus = 'ERROR';
        }
      }
    },
  },
};
</script>

<style scoped></style>
