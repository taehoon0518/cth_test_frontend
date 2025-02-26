import { createWebHistory, createRouter } from 'vue-router'

import BoardListPage from '../components/BoardListPage.vue'
import BoardRegisterPage from '../components/BoardRegisterPage.vue';
import BoardDetailPage from '../components/BoardDetailPage.vue';

const routes = [
    { path: '/', redirect: '/board/list' }, 
    { path: '/board/list', component: BoardListPage },
    { path: '/board/register', component: BoardRegisterPage },
    { path: '/board/:idx', component: BoardDetailPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;