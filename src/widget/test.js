import Vue from "vue";

import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';

import i18n from "@/i18n";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import TempalteView from "../components/constructor/Test"
Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
console.log(i18n.locale)
Vue.use(vueNcform, { extComponents: ncformBootstrap, lang: i18n.locale});

Vue.config.productionTip = false;
Vue.config.runtimeCompiler = true

function createVueInstance(opt) {
    var ComponentClass = Vue.extend(TempalteView)
    var instance = new ComponentClass({
        propsData: {
            opt: opt
        }
    })
    return instance
}
class inviteWidget {
    constructor(options) {
        this.widget = createVueInstance(options);
    }
    mount(id) {
        console.log(this.widget)
        this.widget.$mount(id)
    }
}
export default inviteWidget