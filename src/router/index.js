import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Herd from "@/views/Herd";
import Hug from "@/views/Hug";
import Pony from "@/views/Pony";
import Register from "@/views/Register";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/herd',
        name: 'Herd',
        component: Herd
    },
    {
        path: '/hug',
        name: 'Hug',
        component: Hug
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/herd/:id',
        name: 'Pony',
        component: Pony
    },
    {
        path: '/about',
        name: 'About',
        // About az lazy load, mert senki se fogja amugy se elolvasni
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
