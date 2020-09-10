import Vue from 'vue'
import VueRouter from 'vue-router'

import api from '@/api'

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
        component: Register,
        meta: {
            unregisteredOnly: true
        }
    },
    {
        path: '/herd/:id',
        name: 'Pony',
        component: Pony
    },
    {
        path: '/admin',
        name: 'Admin',
        // Admin is lazy load, mert az átlag usereknek nem kell
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
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

router.beforeEach((to, from, next) => {
    if (api.haveToken) { // loggedin
        if (to.matched.some(record => record.meta.unregisteredOnly)) {
            // trying to navigate to a unregistered only endpoint
            next({name: 'Home'})
        } else {
            next()
        }
    } else { // loggedout
        if (to.matched.some(record => record.meta.unregisteredOnly)) {
            next()
        } else {
            // Trying to navigate to a not unregistered (=registered only) endpoint
            next({name: 'Register'})
        }
    }
})


export default router
