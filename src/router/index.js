import Vue from 'vue'
import VueRouter from 'vue-router'

import api from '@/api'

import HomeView from '@/views/HomeView.vue'
import HerdView from "@/views/HerdView";
import HugView from "@/views/HugView";
import PonyView from "@/views/PonyView";
import RegisterView from "@/views/RegisterView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/herd',
        name: 'Herd',
        component: HerdView
    },
    {
        path: '/hug',
        name: 'Hug',
        component: HugView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: {
            unregisteredOnly: true
        }
    },
    {
        path: '/herd/:id',
        name: 'Pony',
        component: PonyView
    },
    {
        path: '/admin',
        name: 'Promote',
        // Admin is lazy load, mert az átlag usereknek nem kell
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/PromoteView.vue')
    },
    {
        path: '/admin/debug',
        name: 'Debug',
        // Admin is lazy load, mert az átlag usereknek nem kell
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/DebugView.vue')
    },
    {
        path: '/admin/leaderboard',
        name: 'Leaderboard',
        // Admin is lazy load, mert az átlag usereknek nem kell
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/LeaderboardView.vue'),
        meta: {
            adminOnly: true
        }
    },
    {
        path: '/admin/players',
        name: 'Players',
        // Admin is lazy load, mert az átlag usereknek nem kell
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/PlayersView.vue'),
        meta: {
            adminOnly: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // About az lazy load, mert senki se fogja amugy se elolvasni
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {
            public: true
        }
    },
    {
        path: '/hesoyam',
        name: 'HESOYAM',
        // HESOYAM az lazy load, mert soha senki nem fogja megtalálni
        component: () => import(/* webpackChunkName: "about" */ '../views/HesoyamView.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
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
            if (to.matched.some(record => record.meta.public)) {
                next()
            } else {
                // Trying to navigate to a not unregistered (=registered only) and public endpoint
                next({name: 'Register'})
            }
        }
    }
    // Admin only not implemented, because it would require waiting for the user data to arrive, and I'm not in the mood of coding that
})


export default router
