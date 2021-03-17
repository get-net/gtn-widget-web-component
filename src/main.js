import Vue from "vue";
import App from "./App.vue";
import wrap from "@vue/web-component-wrapper";
import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
Vue.use(vueNcform, { extComponents: ncformBootstrap});
Vue.mixin({router, store, i18n})
Vue.config.productionTip = false;

const wrappedElement = wrap(Vue, App);
window.customElements.define("invite-widget", wrappedElement);