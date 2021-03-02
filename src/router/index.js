import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import InviteConstructor from "@/components/constructor/InviteConstructor"
import ConstructorList from "@/components/constructor/ConstructorList"
import TemplateView from "@/components/constructor/TemplateView"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Layout,
        name: 'layout',
        redirect: {name: "constructor"},
        children: [
            {
                path: "constructor",
                component: InviteConstructor,
                name: "constructor"
            },                
            {
                path:"constructor/list",
                component: ConstructorList,
                name:"constructorlist"
            },
            {
                path:"constructor/view",
                component: TemplateView,
                name:"constructorview"
            },
        ]
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
