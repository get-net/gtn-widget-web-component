import VuexReset from "@ianwalter/vuex-reset";
import Vuex from "vuex";
import Vue from "vue";
import kyc from "@/services/kyc"
import router from "../router/index.js";
// modules
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [VuexReset],
    state: {
        template: null,
        counterparty: null
    },
    getters: {
        template: state => state.template,
        counterparty: state => state.counterparty
    },
    mutations: {
        reset: () => {},
        setTemplate: (state, newTemplate) => Vue.set(state, 'template', newTemplate),
        setCounterparty: (state, counterparty) => Vue.set(state, 'counterparty', counterparty)
    },
    actions: {
        showError: (ctx, e) => {
            return e;
        },
        getDetailtypeByCode(ctx, body) {
            console.log(body)
            return kyc.get(`/get_detailtype?code=${body.code}&client_uid=${body.client_id}`).then(({data}) =>{
                if (!data.error) {
                    if (data.embed) {
                        data.detailtype.data = [JSON.parse(data.detailtype.data)]
                    } else {
                        data.detailtype.data = JSON.parse(data.detailtype.data)
                    }
                    ctx.commit('setCounterparty', data.counterparty)
                    ctx.commit('setTemplate', data.detailtype);
                }
            })
        },
        saveDetailData(ctx, body) {
            return kyc.post("/detail", body).then(({data}) => {
                if (!data.error) {
                    router.push({name: "success"})
                }
            })
        },
    }
});
