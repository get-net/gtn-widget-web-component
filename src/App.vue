<template>
<div>
  <layout></layout>
</div>
  
  
</template>

<style lang="scss">
@import './assets/scss/style.scss';
@import '~bootstrap-vue/src/index.scss';
@import '~@icon/dripicons/dripicons.css';
</style>

<script>
import Layout from './views/Layout.vue'
export default {
  components: { Layout },
  mounted() {
    if (this.$route.query.code && this.$parent.$options.clientData.clientId) {
      this.$store.dispatch("getDetailtypeByCode",
        {
          code: this.$route.query.code,
          client_id: this.$parent.$options.clientData.clientId
        }
      );
    }

    if (this.$route.query.locale) {
      this.$i18n.locale = this.$route.query.locale
    }
  }
}
</script>