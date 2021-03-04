<template>
  <constructor-view v-if="currentTemplate" :template="currentTemplate.data"></constructor-view>
</template>

<script>
import ConstructorView from "./ConstructorView";
export default {
  components: {
    ConstructorView,
  },
  computed: {
    currentTemplate() {
      return this.$store.getters['template']
    }
  },
};
</script>

<style></style>
