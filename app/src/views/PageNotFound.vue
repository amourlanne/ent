<template>
  <div class="page-not-found">
    <div class="d-flex justify-content-center align-items-center">
      <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">
        {{ $t('pageNotFound') }}
      </h1>
      <div class="inline-block align-middle">
        <h2 class="font-weight-normal lead" id="desc">
          {{ $t('brokenLink') }}
        </h2>
      </div>
    </div>
    <router-link :to="{ name: 'home' }">{{ $t('backToSite') }}</router-link>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageNotFound extends Vue {
  locale = process.env.VUE_APP_LOCALE;
}
</script>

<style scoped></style>
