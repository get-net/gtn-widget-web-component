import Vue from "vue";
import App from "./App.vue";

// npm packages
// import VueFormlyBootstrap from "vue-formly-bootstrap";
// import VueFormly from "vue-formly";

import vueNcform from "ncform"
import ncformBootstrap from 'ncform-bootstrap';

// app packages
import router from "./router";
import store from "./store";
import i18n from "@/i18n";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import SelectMultiple from "@/components/fields/SelectMultiple";
// import RangePicker from "@/components/fields/RangePicker";
// import Datepicker from "@/components/fields/Datepicker";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
Vue.use(vueNcform, { extComponents: ncformBootstrap, lang: 'en'});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    methods: {
        showError(msg) {
            this.$bvToast.toast(msg)
        }
    }
}).$mount("#app");
