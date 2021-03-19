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
                    {{i18nData[locale].submit}}
                </b-button>
            </b-row>
        </b-card>
  </div>
</template>

<script>
const _ = require('lodash');
import store from "../../store"
export default {
    data() {
        return {
            i18nData: {
                ru: {
                    submit: "Отправить"
                },
                en: {
                    submit: "Send"
                }
            },
            locale: "en"
        }   
    },
    props: ['template'],
    computed: {
        counterparty() {
            return store.getters['counterparty']
        },
        currentTemplate() {
            return store.getters['template']
        },
        fileLink() {
            return store.getters['fileLink']
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
            let promises = []
            this.template.forEach(item => {
                let promise = new Promise(resolve => {
                    this.$ncformValidate(item.id).then(res => {
                        resolve(res)
                    })
                })
                promises.push(promise)
            })

            Promise.all(promises).then(data => {
                let validationPassed = data.every(el => {
                    return el.result === true
                })
                if(validationPassed) {
                    this.saveFiles()
                    let body = {
                        detail: this.currentTemplate.uid,
                        status: "new"
                    }
                    store.dispatch("updateDetailStatus", body)       
                }
            })  
        },
        onFormUpdate() {
            
            let body = {
                uid: this.currentTemplate.uid,
                data: JSON.stringify(this.template),
                force: true
            }
            store.dispatch("updateDetailData", body)
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
    mounted() {
    const params = new URLSearchParams(window.location.search)
        if (params.has('locale')) {
            this.locale = params.get('locale')
        }
    },
    created: function () {
        this.debouncedUpdate = _.debounce(this.onFormUpdate, 5000)
    },
}
</script>
   
<style>

</style>