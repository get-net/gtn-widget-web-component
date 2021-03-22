<template>
  <div>
    <template-view></template-view>
  </div>
</template>

<script>
import store from "../store"
import TemplateView from '@/components/constructor/TemplateView.vue';
export default {
  components: { TemplateView },
  props: ['client'],
  mounted() {
    const params = new URLSearchParams(window.location.search)

    if (params.get('code') && this.client) {
      store.dispatch("getInvitationData",
        {
          code: params.get('code'),
          client_id: this.client
        }
      ); 
    }

    if (params.has('locale')) {
      window.__$ncform.lang = params.get('locale')
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/style.scss';
  @import '~bootstrap-vue/src/index.scss';
</style>
