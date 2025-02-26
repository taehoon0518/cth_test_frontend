import { createWebHistory, createRouter } from 'vue-router'

import BoardListPage from '../components/BoardListPage.vue'
import BoardRegisterPage from '../components/BoardRegisterPage.vue';

const routes = [
    { path: '/', redirect: '/board/list' }, 
    { path: '/board/list', component: BoardListPage },
    { path: '/board/register', component: BoardRegisterPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;