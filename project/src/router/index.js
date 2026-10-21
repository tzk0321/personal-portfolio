import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import AboutView from '../components/AboutView.vue'
import WebView from '../components/WebView.vue'
import photoView from '../components/photoView.vue'
import textView from '../components/textView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/web',
    name: 'web',
    component: WebView
  },
  {
    path: '/photo',
    name: 'photo',
    component: photoView
  },
  {
    path: '/text',
    name: 'text',
    component: textView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router