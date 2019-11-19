<template>
  <div class="app-login">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card  my-5">
            <div class="card-body">
              <locale-changer></locale-changer>
              <h4 class="card-title text-center mb-4 mt-1">Sign in</h4>
              <hr />
              <p class="text-success text-center" v-if="submitStatus === 'OK'">
                Thanks for your submission!
              </p>
              <!--    <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>-->
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
                      'form-group-error': $v.username.$error,
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
                      placeholder="Username or email"
                      type="text"
                      v-model.trim="$v.username.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.username.required">
                    {{ $t('form.validation.required') }}
                  </small>
                  <small class="form-error form-text text-danger" v-if="!$v.username.minLength">
                    username must have at least
                    {{ $v.username.$params.minLength.min }} letters.
                  </small>
                </div>
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
                      class="form-control"
                      placeholder="Password"
                      type="password"
                      v-model.trim="$v.password.$model"
                    />
                  </div>
                  <small class="form-error form-text text-danger" v-if="!$v.password.required">{{
                    $t('form.validation.required')
                  }}</small>
                </div>
                <div class="form-check mb-3">
                  <input type="checkbox" class="form-check-input" />
                  <label class="form-check-label">Remember me</label>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="submitStatus === 'PENDING'">
                    Sign in
                  </button>
                </div>
              </form>
              <router-link :to="{ name: 'register' }" class="btn btn-outline-primary btn-block mb-3">Sign up</router-link>
              <p class="text-center">
                <router-link :to="{ name: 'password-reset' }" class="text-center">{{ $t('auth.forgotPassword') }}</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';
import LocaleChanger from '../components/LocaleChanger';
import userService from '../services/user.service';
import globalConfig from '../../../api/config';

export default {
  name: 'login',
  components: { LocaleChanger },
  data() {
    return {
      username: '',
      password: '',
      submitStatus: null,
      errorMessage: null,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.submitStatus = 'PENDING';

        let username = this.username;
        let password = this.password;

        const redirectUrl = this.$store.state.redirectUrl || {
          name: 'home',
        };

        try {
          const user = await userService.login(username, password);
          this.$store.commit('set_current_user', { currentUser: user });

          this.submitStatus = 'OK';
          await this.$router.push(redirectUrl);
        } catch (error) {
          this.submitStatus = 'ERROR';
          this.errorMessage = error.message;
        }
      }
    },
  },
};
</script>

<style scoped></style>
