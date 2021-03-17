<template>
  <div>
    <template-view></template-view>
  </div>
</template>

<style lang="scss">
@import './assets/scss/style.scss';
@import '~bootstrap-vue/src/index.scss';
@import '~@icon/dripicons/dripicons.css';
</style>

<script>
import TemplateView from './components/constructor/TemplateView.vue';
export default {
  components: { TemplateView },
  props: ['client', 'test'],

  mounted() {
    const params = new URLSearchParams(window.location.search)
    if (params.get('code') && this.client) {
      this.$store.dispatch("getDetailtypeByCode",
        {
          code: params.get('code'),
          client_id: this.client
        }
      ); 
    }

    if (params.has('locale')) {
      this.$i18n.locale = params.get('locale')
      window.__$ncform.lang = params.get('locale')
    }
  }
}
</script>