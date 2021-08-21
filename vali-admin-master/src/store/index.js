import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)



				
export default new Vuex.Store({
    state: {
		// 主题
       theme:{
		   color1: 'rgb(121,151,252)',
		   color2: 'rgb(96,132,244)',
		   color3: 'rgb(230,235,254)',
	   },
	   
	   
    },
    //计算属性
    getters:{
    },
    //同步修改
    mutations: { 
	
	   
	   
    },
    actions: {
		
    }
})