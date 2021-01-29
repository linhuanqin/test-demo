import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        { 
            path: '/',
            component: resolve => require(['@/pages'], resolve),
            redirect: '/check',
            children: [
                { 
                    path: '/check',
                    component: resolve => require(['@/pages/check'], resolve) 
                },
                { 
                    path: '/leave',
                    component: resolve => require(['@/pages/leave'], resolve) 
                },
                { 
                    path: '/statistics',
                    component: resolve => require(['@/pages/statistics'], resolve) 
                },
                { 
                    path: '/detail',
                    component: resolve => require(['@/pages/detail'], resolve) 
                }
            ]
        },
        { 
            path: '/login',
            component: resolve => require(['@/pages/login'], resolve) 
        },
        {
            path: '/check/details',
            component: resolve => require(['@/pages/check/details'], resolve),
        },
        { 
            path: '/statistics/checklog',
            component: resolve => require(['@/pages/statistics/checklog'], resolve) 
        }
    ]
})
export default router