<template>
  <div>
       <b-card v-for="item in template" v-bind:key="item.id">
            <ncform
                :form-schema="item"
                :form-name="item.id"
            ></ncform>
        </b-card>
        <b-card>
            <b-row>
                <b-button>
                    Отправить
                </b-button>
            </b-row>
        </b-card>
  </div>
</template>

<script>
export default {
    props: ['template'],
}
</script>

<style>

</style>