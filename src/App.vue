<template>
  
  <constructor-view v-if="currentTemplate" :template="currentTemplate.data"></constructor-view>
</template>

<style lang="scss">
@import './assets/scss/style.scss';
@import '~bootstrap-vue/src/index.scss';
@import '~@icon/dripicons/dripicons.css';
</style>

<script>
import ConstructorView from './components/constructor/ConstructorView.vue'
export default {
  components: { ConstructorView },

  computed: {
    currentTemplate() {
      console.log(this.$store.getters['template'])
      return this.$store.getters['template']
    }
  },

  mounted() {
    this.$store.dispatch("getDetailtypeByCode", {code: this.$route.query.code})
  }
}
</script>