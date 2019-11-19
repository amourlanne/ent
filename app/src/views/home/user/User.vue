<template>
  <div class="organization-user" v-if="user">
    <helmet>
      <title>{{ currentUser.firstName }} {{ currentUser.lastName }}</title>
    </helmet>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="app-user" v-if="user">
            <div>{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
            <div>{{ currentUser.email }}</div>
            <div v-if="user.company">{{ currentUser.company.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import userService from "@/services/user.service";
// @ts-ignore
import { Helmet } from "@jnields/vue-helmet";

export default Vue.extend({
  name: "user",
  components: { Helmet },
  data() {
    return {
      currentUser: null as null | Object
    };
  },
  async beforeMount() {
    const username = this.$route.params.username;
    try {
      const organizationSlug = this.$route.params.organizationSlug;
      this.currentUser = await userService.getOneByOrganizationSlugAndUsername(
        organizationSlug,
        username
      );
    } catch (e) {
      // console.log(e);
    }
  }
});
</script>

<style lang="scss"></style>
