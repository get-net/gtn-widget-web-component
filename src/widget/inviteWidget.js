import Vue from "vue";
import App from "../App.vue";
import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';
import router from "../router";
import store from "../store";
import i18n from "@/i18n";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
console.log(i18n.locale)
Vue.use(vueNcform, { extComponents: ncformBootstrap, lang: i18n.locale});

Vue.config.productionTip = false;
Vue.config.runtimeCompiler = true

function createVueInstance(opt) {
    return new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
        methods: {
            showError(msg) {
                this.$bvToast.toast(msg)
            }
        },
        clientData: opt
    })
}
class inviteWidget {
    constructor(options) {
        this.widget = createVueInstance(options);
    }
    mount(id) {
        this.widget.$mount(id)
    }
}
export default inviteWidget