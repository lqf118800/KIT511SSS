import Vue from 'vue'
import Router from 'vue-router'
import menuRoute from './menuRoute.js'
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
			redirect: '/pages/student/coc',
		},
	]
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || ' manager system';
	if(!localStorage.userInfo && to.path !=='/login') return  from.path !=='/login' && router.replace({path: '/login'})
	next();
})

export default router;