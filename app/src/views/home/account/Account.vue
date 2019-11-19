<template>
  <div class="account">
    <helmet>
      <title>Account</title>
    </helmet>
    <div v-if="currentUser">{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Helmet } from '@jnields/vue-helmet';

export default {
  name: 'account',
  components: { Helmet },
  data: () => ({}),
  computed: mapState(['currentUser']),
  validations: {},
  methods: {},
  async beforeMount() {},
};
</script>

<style scoped></style>
