export default{
	symbol(){
		return Symbol();
	},
	
	
	
	// A deep copy of the object
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
	
	// The type of judgment
	isType(o){
		return Object.prototype.toString.call(o).match(/\[object\s([a-zA-Z0-9]+)\]/)[1];
	},
	
	
	
	
	// Anti-shake
	debounce:{
		data: [],
		commit(name, fun,  waitTime = 1000){
			if(!name) return;
			let target = this.data.find( v => v.name === name );
			// name must be unique
			if(!target){
				target = { name,   waitTime};
				this.data.push(target);
			}
			
			clearTimeout( target.timer);
			target.timer = setTimeout( fun, waitTime);
			
		}
	}
	
	
}