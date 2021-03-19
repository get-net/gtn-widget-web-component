<template>
  <div>
    бляяя
    <template-view></template-view>
  </div>
</template>

<style lang="scss">
@import './assets/scss/style.scss';
@import '~bootstrap-vue/src/index.scss';
@import '~@icon/dripicons/dripicons.css';
</style>

<script>
import store from "./store"

import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import TemplateView from './components/constructor/TemplateView.vue';
export default {
  components: { TemplateView },
  props: ['client', 'test'],

  mounted() {
    // window.Vue.use(BootstrapVue);
    // window.Vue.use(IconsPlugin)
    window.Vue.use(vueNcform, { extComponents: ncformBootstrap})
    window.Vue.config.productionTip = false;
    const params = new URLSearchParams(window.location.search)
    console.log(params.get('code'))
    if (params.get('code') && this.client) {
      store.dispatch("getDetailtypeByCode",
        {
          code: params.get('code'),
          client_id: this.client
        }
      ); 
    }

    if (params.has('locale')) {
      // i18n.locale = params.get('locale')
      window.__$ncform.lang = params.get('locale')
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/style.scss';
@import '~bootstrap-vue/src/index.scss';
@import '~@icon/dripicons/dripicons.css';
</style>