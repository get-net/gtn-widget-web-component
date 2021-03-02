<template>
    <div>
        <b-row v-for="option in localOptions" v-bind:key="option.value">
            <b-col md="1">
                <p class="h5 mt-2">
                    <b-icon-circle v-if="type ==='radio'">
                    </b-icon-circle>
                    <b-icon-square v-if="type ==='checkbox'">
                    </b-icon-square>
                </p>
            </b-col>
            <b-col>
                <b-input v-model="option.text" :ref="option.value"></b-input>
            </b-col>
            <b-col md="2">
                <p class="h4 mt-2 ml-1"
                    v-if="option.err"
                    style="float:left"
                    title="Введите уникальное название"
                >
                    <b-icon icon="exclamation-circle-fill" variant="warning"></b-icon>
                </p>
                <p class="h3 mt-1"
                    title="Удалить"
                    @click="onDeleteOptionClick(option.value)"
                >
                    <b-icon-x>
                    </b-icon-x>
                </p>
                
            </b-col>
            
        </b-row>
        
        <b-row @click="onAddOptionClick">
            <b-col md="1">
                <p class="h5 mt-2">
                    <b-icon-circle v-if="type ==='radio'">
                    </b-icon-circle>
                    <b-icon-square v-if="type ==='checkbox'">
                    </b-icon-square>
                </p>
            </b-col>
            <b-col md="9">
                <b-input placeholder="Добавить вариант"></b-input>
            </b-col>
            
        </b-row>
    </div>
</template>

<script>
import generateId from "@/utils/randomId";
export default {

    props: ['config', 'type'],

    data() {
        return {
            localOptions: this.config.options ?? []
        }
    },

    watch: {
        localOptions: {
            deep: true,
            handler() {
                //implement duplicate text search in options
            }
        }
    },
    methods: {
        onAddOptionClick() {
            let text = "Вариант " + (this.localOptions.length+1)
            let newid = generateId();
            this.localOptions.push({value: newid, text: text, err:false})
            this.$nextTick(() => {
                this.$refs[newid][0].$el.focus()
            });
            this.config.options = this.localOptions
        },

        onDeleteOptionClick(deleteValue) {
            this.localOptions = this.localOptions.filter(item => item.value !== deleteValue)
        }
    },

}
</script>

<style>
    
</style>