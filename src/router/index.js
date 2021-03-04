import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import TemplateView from "@/components/constructor/TemplateView"
import TemplateSent from "@/components/messages/TemplateSent"
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Layout,
        name: 'layout',
        children: [
            {
                path:"template",
                component: TemplateView,
                name:"template"
            },
            {
                path: "success",
                component: TemplateSent,
                name: "success"
            }
            
        ],
    }
   
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
