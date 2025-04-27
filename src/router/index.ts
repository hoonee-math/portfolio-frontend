import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import PortfolioView from '../views/PortfolioView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'portfolio',
        component: PortfolioView
    }
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