import inviteWidget from "./InviteWidgetComponent.vue"
import vueNcform from "@ncform/ncform"
import ncformBootstrap from 'ncform-bootstrap';
import { 
    ButtonPlugin,
    LayoutPlugin,
    InputGroupPlugin,
    FormInputPlugin,
    CardPlugin,
    FormTextareaPlugin,
    FormDatepickerPlugin,
    FormFilePlugin,
    FormCheckboxPlugin,
    FormGroupPlugin,
    FormRadioPlugin
 } from "bootstrap-vue";
const plugin = {
    install: function(Vue) {
        if (!window.__$ncform) {
            Vue.use(vueNcform, { extComponents: ncformBootstrap});
        }

        Vue.use(ButtonPlugin);
        Vue.use(LayoutPlugin);
        Vue.use(InputGroupPlugin);
        Vue.use(FormInputPlugin);
        Vue.use(CardPlugin);
        Vue.use(FormTextareaPlugin);
        Vue.use(FormDatepickerPlugin);
        Vue.use(FormFilePlugin);
        Vue.use(FormCheckboxPlugin);
        Vue.use(FormGroupPlugin);
        Vue.use(FormRadioPlugin)
        Vue.component("invite-widget", inviteWidget)
    }
}
export default plugin