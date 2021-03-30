import Vue from 'vue';
import wrap from "@vue/web-component-wrapper";
import inviteWidgetComponent from "./InviteWidgetComponent.vue";
import vueNcform from "@ncform/ncform";
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

Vue.use(vueNcform, { extComponents: ncformBootstrap});
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
Vue.use(FormRadioPlugin);

const inviteWebComponent = wrap(Vue, inviteWidgetComponent);

window.customElements.define('invite-widget', inviteWebComponent);