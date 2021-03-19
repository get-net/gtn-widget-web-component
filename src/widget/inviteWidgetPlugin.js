import inviteWidget from "./InviteWidgetComponent.vue"
import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
const plugin = {
    install: function(Vue) {
        if (!window.__$ncform) {
            Vue.use(vueNcform, { extComponents: ncformBootstrap});
        }
        Vue.use(BootstrapVue);
        Vue.use(IconsPlugin)
        Vue.component("invite-widget", inviteWidget)
    }
}
export default plugin