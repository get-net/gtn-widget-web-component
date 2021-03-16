import Vue from "vue";
import App from "./Testvite.vue";
import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
Vue.use(vueNcform, { extComponents: ncformBootstrap});

Vue.config.productionTip = false;

new Vue({
    name: "main",
    render: h => h(App),
}).$mount("#app");