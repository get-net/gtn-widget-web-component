<template>
  <constructor-view :template="currentTemplate.data"></constructor-view>
</template>

<script>
import ConstructorView from "./ConstructorView";
export default {
  components: {
    ConstructorView,
  },
  data() {
    return {
      currentTemplate: {
        data: [],
      },
    };
  },
  computed: {
    avaliableTemplates() {
      return this.$store.getters["invite/avaliableTemplates"];
    },
  },
  async mounted() {
    await this.$store.dispatch("invite/getAvaliableTemplates");
    let avaliableTemplates = this.$store.getters["invite/avaliableTemplates"];
    if (this.$route.query.schema) {
      this.currentTemplate = avaliableTemplates.find(
        (item) => item.uid === this.$route.query.schema
      );
      this.currentTemplate.data = JSON.parse(this.currentTemplate.data);
      this.currentTemplate.data = this.currentTemplate.embed
        ? [this.currentTemplate.data]
        : this.currentTemplate.data;
    }
  },
};
</script>

<style></style>
