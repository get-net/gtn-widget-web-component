<template>
  <div>
       <b-dropdown id="dropdown-1" text="Создать" class="m-md-2">
            <b-dropdown-item @click="onEmbedTemplateClick">Встраиваемый шаблон</b-dropdown-item>
            <b-dropdown-item @click="onSimpleTemplateClick">Обычный</b-dropdown-item>
        </b-dropdown>
      <b-table striped hover :items="items" :fields="['name', 'description', 'embed','option']">
        <template #cell(option)="row">
          <b-icon-box-arrow-up-right 
            @click="goToTemplate(row)"
          >
          </b-icon-box-arrow-up-right>

          <b-icon-files
            class="ml-3"
            @click="duplicate(row)"
          >
          </b-icon-files>
        </template>
      </b-table>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        items() {
            return this.$store.getters["invite/avaliableTemplates"]
        }
    },
    methods: {
        goToTemplate(row) {
            console.log(row)
            this.$router.push({name: "constructorview" , query: { schema: row.item.uid }})
        },
        duplicate(row) {
            this.$router.push({name: "constructor" , query: { schema: row.item.uid }})
        },
        onEmbedTemplateClick() {
            this.$router.push({name: "constructor", query: { embed: true }})
        },
        onSimpleTemplateClick() {
          this.$router.push({name: "constructor"})
        }
    },
    async mounted() {
        await this.$store.dispatch("invite/getAvaliableTemplates")
    }
}
</script>

<style>

</style>