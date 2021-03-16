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
        },
        fileLink() {
            return this.$store.getters['fileLink']
        }
    },
    watch: {
        template: {
            deep: true,
            handler() {
                this.debouncedUpdate();     
            }
        },
        fileLink(val) {
            console.log(JSON.stringify(this.template))
            console.log(val)
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
                this.saveFiles()
                let body = {
                    detail: this.currentTemplate.uid,
                    status: "new"
                }
                this.$store.dispatch("updateDetailStatus", body)       
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
            this.template.forEach(item => {
                Object.entries(item.value).forEach(entry => {
                    if (entry[1] instanceof Array) {
                        if (entry[1][0] instanceof File)  {
                            this.$store.dispatch("uploadFileToFileManager", entry[1][0])           
                        }      
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