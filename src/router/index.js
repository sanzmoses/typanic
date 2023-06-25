import { createRouter, createWebHistory } from 'vue-router' 

import Home from '../views/Home.vue'
import About from '../views/About/index.vue'
import Components from '../views/Components/index.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/components', name: 'Components', component: Components },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router