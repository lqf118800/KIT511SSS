<style lang="scss" scoped>
	.n-slider {
		@include n-col1;
		align-items: stretch;
		z-index: 10;
		transition: width 0.3s;
		.n-slider-company{
			@include n-row2;
			height: 60px;
			cursor: pointer;
			border-right: 1px solid #555;
			color: #eee;
			font-size: 26px;
			font-weight: 100;
			white-space: nowrap;
			overflow: hidden;
			background-color: black;
			i{
				color: #fff;
			}
		}
		.n-slider-menu{
			flex: 1;
			background: #222;
			height: 0;
			border-right: 1px solid #eee;
			/deep/ .el-menu{
				border: none;
			}
			
		}
		.n-slider-menu::-webkit-scrollbar {
			width: 0px;
			height: 0px;
		}
		
		.n-slider-company img{
			background-color: black;
			width:100%; height:auto;
		}
		
		
	}
</style>


<template>
	<div class="n-slider" :style="{width : intactSlider ? '59px' : '229px'}">
		<div class="n-slider-company"  @click="$router.push('/') ">
			<!-- <i class="el-icon-s-home" v-if="intactSlider" ></i>
			<span v-else>{{title}}</span> -->
			<img src="../../assets/img/2.png" />
		</div>
		<div class="n-slider-menu" :style="{ 'overflow-y': intactSlider ? 'visible' : 'scroll'}">
			<n-slider-node v-for="item in menuList.filter(v=> !v.hide)" :key="item.name"  :menu="item" top />
		</div>
		
	</div>
</template>

<script>
	export default {
		props:{
			intactSlider:{
				type:Boolean,
			},
			title: String,
		},
		data() {
			return {
				menuList: [],
				curr: '',
			}
		},
		provide(){
			return{
			    slider: this,
			}
		},
		watch:{
			'$route'(v){
				if( !this.posiMenu(v.path) ) this.curr = '';
			},
			curr(v){
				if(!v) return;
				this.posiMenu(v.path);
				this.$route.path !== v.path && this.$router.push(v.path);
			}
		},
		components:{
			'n-slider-node': ()=> import('./slider-node'),
		},
		created(){
			this.$bus.on('sliderMenu',routes=>  {
				this.menuList = this.initMenus(routes);
				this.$nextTick(()=>  this.posiMenu(this.$route.path))
			} )
		},

		methods: {
			// 初始化菜单
			initMenus(menus){
				for(const v of menus){
					this.$set(v, 'open',v.open || false);
					if(v.children) this.initMenus(v.children);
				}
				return menus;
			},
			// 定位目标菜单
			posiMenu(path,menus = this.menuList){
				for(const v of menus){
					if(v.path === path) return this.curr = v
					if(v.children) {
						const res = this.posiMenu(path,v.children);
						if(res) return v.open = true;
					}
				}
				return false;
			}
			
		},


	}
</script>
