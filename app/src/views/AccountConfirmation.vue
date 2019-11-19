<template>
  <div class="account-confirmation">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card  my-5">
            <article class="card-body">
              <locale-changer></locale-changer>
              <h4 class="card-title text-center mb-4 mt-1">Set your password</h4>
              <p class="text-center">
                Create your password and log in to your account.
              </p>
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
                      type="email"
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
                      type="email"
                      v-model.trim="$v.passwordRepeat.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.passwordRepeat.required">
                    {{ $t('form.validation.required') }}
                  </small>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="submitStatus === 'PENDING'">
                    Set password and log in
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

export default {
  name: 'account-confirmation',
  components: { LocaleChanger },
  data() {
    return {
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
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = 'PENDING';

        let email = this.email;
      }
    },
  },
};
</script>

<style scoped></style>
