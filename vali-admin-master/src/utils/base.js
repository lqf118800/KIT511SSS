export default{
	symbol(){
		return Symbol();
	},
	
	
	
	// 对象深拷贝
	clone(o) {
		let res;
		if (o && typeof o=== 'object') {
			res = o instanceof Array ? [] : {};
			for (let k of Object.keys(o)) {
				const v = o[k];
				res[k] = this.clone(v);
			}
		}
		else res = o;
		
		return res;
	},
	
	// 判断类型
	isType(o){
		return Object.prototype.toString.call(o).match(/\[object\s([a-zA-Z0-9]+)\]/)[1];
	},
	
	
	
	
	// 防抖
	debounce:{
		data: [],
		commit(name, fun,  waitTime = 1000){
			if(!name) return;
			let target = this.data.find( v => v.name === name );
			// name必须唯一，否则会替代之前的
			if(!target){
				target = { name,   waitTime};
				this.data.push(target);
			}
			
			clearTimeout( target.timer);
			target.timer = setTimeout( fun, waitTime);
			
		}
	}
	
	
}