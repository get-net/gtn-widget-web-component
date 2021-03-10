import VuexReset from "@ianwalter/vuex-reset";
import Vuex from "vuex";
import Vue from "vue";
import kyc from "@/services/kyc"
import kycClient from "@/services/kycClient"
import fileManagerApi from "@/services/fileManagerApi"
import fileManager from "@/services/fileManager"
import router from "../router/index.js";
// modules
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [VuexReset],
    state: {
        template: null,
        counterparty: null,
        token: null,
        unit: null,
        
    },
    getters: {
        template: state => state.template,
        counterparty: state => state.counterparty,
        token: state => state.token,
        unit: state => state.unit
    },
    mutations: {
        reset: () => {},
        setTemplate: (state, newTemplate) => Vue.set(state, 'template', newTemplate),
        setCounterparty: (state, counterparty) => Vue.set(state, 'counterparty', counterparty),
        setToken: (state, token) => Vue.set(state, 'token', token),
        setUnit: (state, unit) => Vue.set(state, 'unit', unit)
    },
    actions: {
        showError: (ctx, e) => {
            return e;
        },
        getDetailtypeByCode(ctx, body) {
            return kyc.get(`/get_detailtype?code=${body.code}&client_uid=${body.client_id}`).then(({data}) =>{
                if (!data.error) {
                    if (data.embed) {
                        data.detailtype.data = [JSON.parse(data.detailtype.data)]
                    } else {
                        data.detailtype.data = JSON.parse(data.detailtype.data)
                    }
                    ctx.commit('setCounterparty', data.counterparty)
                    ctx.commit('setTemplate', data.detailtype);
                    ctx.commit('setToken', data.token.access);
                    ctx.commit('setUnit', data.role.counterparty)
                }
            })
        },
        updateDetailData(ctx, body) {
            return kyc.post("/detail/update", body).then(({data}) => {
                if (!data.error) {
                    return true
                }
            })
        },
        updateDetailStatus(ctx, body) {
            return kycClient.post("/profile/detail/status", body).then(({data}) => {
                if (!data.error) {
                    router.push({name: "success"})
                }
            })
        },
        async uploadFileToFileManager(ctx, body) {
            const reader = new FileReader();
            let payload = {
                name: body.file.name,
                chunks: 1
            }
            fileManagerApi.post("/files/add_file", payload).then(({data}) => {
                if(!data.error) {
                    reader.readAsArrayBuffer(body.file)
                    reader.addEventListener("loadend", function(res) {
                        let chunk = res.target.result
                        fileManager.put("upload", chunk, {
                            headers: {
                                'X-Session-Id':        data.new_file.hash,
                                'Content-Range':       `bytes ${0}-${body.file.size-1}/${body.file.size}`,
                                'Content-Disposition': `attachment; filename*=UTF-8''${encodeURI(body.file.name)}`,
                                'Path': data.new_file.path
                            }
                            
                        })
                    });
                    
                }
            })            
        }
    },
});
