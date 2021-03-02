import VuexReset from "@ianwalter/vuex-reset";
import Vuex from "vuex";
import Vue from "vue";
import kyc from "@/services/kyc"
// modules
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [VuexReset],
    state: {
        template: null,

    },
    getters: {
        template: state => state.template 
    },
    mutations: {
        reset: () => {},
        setTemplate: (state, newTemplate) => Vue.set(state, 'template', newTemplate)
    },
    actions: {
        showError: (ctx, e) => {
            return e;
        },
        getDetailtypeByCode(ctx, body) {
            return kyc.get(`/get_detailtype?code=${body.code}`).then(({data}) =>{
                if (!data.error) {
                    if (data.embed) {
                        data.data = [JSON.parse(data.data)]
                    } else {
                        data.data = JSON.parse(data.data)
                    }

                    ctx.commit('setTemplate', data);
                }
            })
        }
    }
});
