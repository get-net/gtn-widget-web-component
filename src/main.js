import Vue from "vue";
import App from "./App2.vue";
// import wrap from "@vue/web-component-wrapper";
// import vueNcform from "@ncform/ncform"
// import ncformBootstrap from 'ncform-bootstrap';
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import router from "./router";
// import store from "./store";
// import i18n from "@/i18n";

import invitePlugin from "./widget/inviteWidgetPlugin"
Vue.use(invitePlugin)
let el = new Vue({
    render: h => h(App),
})
el.$mount("#app");
console.log(el)
window.vvv = el

// const wrappedElement = wrap(Vue, App);
// window.customElements.define("invite-widget", wrappedElement);