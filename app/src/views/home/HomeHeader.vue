<template>
  <header class="home-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">
              {{ $t('nav.headers.home') }}
            </router-link>
          </li>
          <li class="nav-item" v-if="currentUser && currentUser.role === 'ROLE_ADMIN'">
            <router-link :to="{ name: 'users' }" class="nav-link">
              {{ $t('nav.headers.users') }}
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-3">
          <li class="nav-item">
            <locale-changer></locale-changer>
          </li>
        </ul>
        <ul class="navbar-nav ml-2">
          <li class="nav-item dropdown" v-if="currentUser">
            <a
              class="nav-link"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ currentUser.firstName }} {{ currentUser.lastName }}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <router-link :to="{ name: 'account' }" class="dropdown-item dropdown-item-action">
                Account settings
              </router-link>
              <a class="dropdown-item dropdown-item-action" v-on:click="logout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import LocaleChanger from '../../components/LocaleChanger.vue';
import { mapState } from 'vuex';
import userService from '@/services/user.service';
import authenticationService from '@/services/authentication.service';

export default Vue.extend({
  name: 'home-header',
  components: { LocaleChanger },
  props: [],
  computed: mapState(['currentUser']),
  data: () => ({}),
  methods: {
    async logout() {
      try {
        this.$store.commit('logout');
        authenticationService.logout();
        await this.$router.push({
          name: 'login',
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style lang="scss"></style>
