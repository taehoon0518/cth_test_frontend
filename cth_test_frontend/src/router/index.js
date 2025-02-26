import { createWebHistory, createRouter } from 'vue-router'

import BoardListPage from '../components/BoardListPage.vue'

const routes = [
    { path: '/', redirect: '/board/list' }, 
    { path: '/board/list', component: BoardListPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;