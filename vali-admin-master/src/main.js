import "babel-polyfill"

import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js';



import elUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from './i18n/en.js';
import axios from 'axios'
Vue.prototype.$axios = axios

new Vue({
	router,
	enLocale,
	store,
	render: h => h(App),
}).$mount('#app')

let mod = [elUi]; 
mod.forEach(v=>Vue.use(v,{enLocale}))
// Vue.use(elUi, {enLocale} )
import qs from 'qs';
import bus from '@/utils/bus';
import base from '@/utils/base';
import request from '@/utils/request';

const msg = function(message = '操作成功',type = 1){
	this.$message({  type: type === 1 ? 'success' : type === 2 ? 'error' : 'warning', message })
}

let js = {qs,base,bus,request,msg};
Object.keys(js).forEach( k => Vue.prototype['$'+k] = js[k]);

Vue.config.silent = true;                         
Vue.config.devtools = true;                       
Vue.config.productionTip = false;                  
 





