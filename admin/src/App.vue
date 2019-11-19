<template>
  <helmet-provider>
    <div class="app">
      <helmet defaultTitle="Smarts" titleTemplate="Smarts | %s">
        <html :lang="this.$i18n.locale"></html>
      </helmet>
      <router-view></router-view>
    </div>
  </helmet-provider>
</template>

<script lang="ts">
import Vue from "vue";
// @ts-ignore
import { Helmet, HelmetProvider } from "@jnields/vue-helmet";

export default Vue.extend({
  name: "app",
  components: { Helmet, HelmetProvider }
});
</script>

<style lang="scss">
form {
  .form-error {
    display: none;
  }
  .form-group-error {
    + .form-error {
      display: block;
    }
  }
  .dropdown-item-action {
    cursor: pointer;
  }
}
</style>
