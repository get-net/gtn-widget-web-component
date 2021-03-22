import Vue from "vue";
import App from "./App.vue";
import invitePlugin from "./widget/inviteWidgetPlugin"
Vue.use(invitePlugin)
new Vue({
    render: h => h(App),
}).$mount("#app")