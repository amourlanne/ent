<template>
  <div class="home">
    <helmet defaultTitle="Home" titleTemplate="Home | %s"> </helmet>
    <home-header></home-header>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import LocaleChanger from '../../components/LocaleChanger';
import { mapState } from 'vuex';
import { Helmet } from '@jnields/vue-helmet';
import HomeHeader from './HomeHeader';

export default Vue.extend({
  name: 'home',
  components: { Helmet, HomeHeader },
  data: () => ({}),
  computed: mapState(['authUser']),
  validations: {},
  methods: {},
  async beforeMount() {},
});
</script>

<style scoped></style>
