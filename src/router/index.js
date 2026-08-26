import Vue from 'vue'
import VueRouter from 'vue-router'
import FuncView from '../views/FuncView.vue'
import MineView from '../views/MineView.vue'
import PasswordView from '../views/PasswordView.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/func' },
  { path: '/home', redirect: '/func' },
  { path: '/func', component: FuncView, meta: { tab: 'func' } },
  { path: '/scan', redirect: '/func' },
  { path: '/mine', component: MineView, meta: { tab: 'mine' } },
  { path: '/password', component: PasswordView },
  { path: '/login', component: LoginView }
]

export default new VueRouter({ routes })
