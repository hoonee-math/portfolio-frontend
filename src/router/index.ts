import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PortfolioView from '../views/PortfolioView.vue'
import TestView from '../views/TestView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'portfolio',
        component: PortfolioView
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/TestView.vue')
    },
    // 존재하지 않는 페이지 처리
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 80 // 스크롤 오프셋 값
            };
        } else {
            return { top: 0 };
        }
    }
});

export default router;