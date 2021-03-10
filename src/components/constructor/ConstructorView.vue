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
const _ = require('lodash');
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
    watch: {
        template: {
            deep: true,
            handler() {
                this.debouncedUpdate();     
            }
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
                })
            })
            if(validationPassed) {
                // let body = {
                //     detail: this.currentTemplate.uid,
                //     status: "new"
                // }
                //this.$store.dispatch("updateDetailStatus", body)
                this.saveFiles()
            }
        },
        onFormUpdate() {
            
            let body = {
                uid: this.currentTemplate.uid,
                data: JSON.stringify(this.template),
                force: true
            }
            this.$store.dispatch("updateDetailData", body)
        },
        saveFiles() {
            this.currentTemplate.data.forEach(item => {
                Object.values(item.value).forEach(propVal => {
                    if (propVal instanceof Array) {
                        propVal.forEach(prop => {
                            if (prop instanceof File) {                  
                                let body = {
                                    file: prop,
                                }
                                this.$store.dispatch("uploadFileToFileManager", body)
                            }
                        })
                    }
                })
            })
        }
    },
    created: function () {
        this.debouncedUpdate = _.debounce(this.onFormUpdate, 5000)
    },
}
</script>
   
<style>

</style>