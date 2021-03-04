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
                    {{$t('constructor.submit')}}
                </b-button>
            </b-row>
        </b-card>
  </div>
</template>

<script>
export default {
    props: ['template'],
    computed: {
        counterparty() {
            return this.$store.getters['counterparty']
        },
        currentTemplate() {
            return this.$store.getters['template']
        }
    },

    methods: {
        onSendFormClick() {
            let validationPassed = true
            this.template.forEach(item => {
                this.$ncformValidate(item.id).then(data => {
                    if (!data.result) {
                        validationPassed = false;         
                    }
                    if(validationPassed) {
                        let body = {
                            counterparty: this.counterparty.uid,
                            type: this.currentTemplate.uid,
                            data: JSON.stringify(this.template)
                        }
                        this.$store.dispatch('saveDetailData', body)
                    }
                })
            })
        }
    }
}
</script>
   
<style>

</style>