<template>
  <div>
       <b-card v-for="item in template" v-bind:key="item.id">
            <ncform
                :form-schema="item"
                :form-name="item.id"
                v-model="item.value"
            ></ncform>
        </b-card>
        <b-card>
            <b-row>
                <b-button @click="onSendFormClick">
                    Отправить
                </b-button>
            </b-row>
        </b-card>
  </div>
</template>

<script>
export default {
    props: ['template'],

    methods: {
        onSendFormClick() {
            this.template.forEach(item => {
                this.$ncformValidate(item.id).then(data => {
                if (data.result) {
                    console.log(item.value)
                    // do what you like to do
                    }
                })
            })
        }
    }
}
</script>
   
<style>

</style>