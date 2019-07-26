import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import Register from './views/Register'
import NoFound from './views/404'
import Test from './views/Test'
import {Message} from "element-ui";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        {
            path: '*',
            name: '404',
            component: NoFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.token ? true : false
    if (to.path == '/login' || to.path == '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router
