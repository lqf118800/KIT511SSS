import Vue from 'vue'
import Router from 'vue-router'
import menuRoute from './menuRoute.js'
import staffMenu from './staffMenu.js'
import store from '../store/index.js'

Vue.use(Router)

const router =  new Router({
	mode: 'hash',
	base: '/',
	routes: [
		{
			path: '/', 
			redirect: '/pages',
		},
		{
			path: '/login', 
			component: ()=> import('@/views/login'),
		},
		{
			path: '/pages', 
			component: ()=> import('@/components/layout/main'),
			children:menuRoute,
			redirect: '/student/coc',
		},
		{
			path: '/staff', 
			component: ()=> import('@/components/layout/staffMain'),
			children:staffMenu,
			redirect: '/staff/apply',
		}

	]
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || ' manager system';
	if(!localStorage.userInfo && to.path !=='/login') return  from.path !=='/login' && router.replace({path: '/login'})
	next();
})

export default router;