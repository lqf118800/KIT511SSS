<style>
	body,html {
		width: 100%;
		min-width: 1000px;
		height: 100%;
		font-size: 14px;
	}
</style>
<style lang="scss" scoped>
	.n-main{
		width: 100%;
		overflow: hidden;
		height: 100%;
		background: #f6f6f6;
		@include n-row2;
		align-items: stretch;
		
		/deep/ .n-nav{
			
		}
		.n-main-right{
			flex: 1;
			width: 0;
			@include n-col1;
			align-items: stretch;
			
			>main{
				height: 0;
				flex: 1;
				overflow: auto;
				
			}
			
		}
		.anim-enter{
			transform: translate(10%);
			opacity: 0.3;
		}
		//元素出现时，  active用来定义动画的时间，曲线等
		.anim-enter-active{
			transform-style:preserve-3d;
		    transition: all 0.3s ;
		}
		//元素出现时 动画的最后一帧状态
		.anim-enter-to{
			transform: translate(0%);
			opacity: 1;
		}
		//元素消失时  动画的第一帧状态 
		.anim-leave{
			transform: translate(0%);
		    opacity: 1;
		}
		//元素消失时，  active用来定义动画的时间，曲线等
		.anim-leave-active{
			transform-style:preserve-3d;
		    transition: all 0.3s ;
		    
		}
		//元素消失时 动画的最后一帧状态
		.anim-leave-to{
			transform: translate(10%);
			opacity: 0.1;
		}
		
	}
</style>

<template>
	<div class="n-main">
		
		<n-slider  :intactSlider="intactSlider" />
		<div class="n-main-right">
			<n-nav :compList="navCompList" :intactSlider.sync="intactSlider" />
			<main>
				<transition   name="anim"  mode="out-in">
					<router-view></router-view>
				</transition>
			</main>
		</div>
		
		
	</div>
</template>
	

<script>
	import routes from '@/router/menuRoute.js'
	export default{
		
		data(){
			
			return{
				intactSlider: true,
				
				navCompList:[
					{ type: 'user'  },
				],
				
				
				systemRoutes: [],
				menus: [],
				
			}
		},
		components:{
			'n-nav': ()=> import('@/components/layout/nav'),
			'n-slider': ()=> import('@/components/layout/slider'),
			
		},
		computed: {
		 
		},
		watch: {
		},
		created(){
			 
		},
		mounted(){
			setTimeout(()=> this.$bus.emit('sliderMenu', routes ), 200)
		},
		methods:{
			 
			 
			
		},
		
		
	}
	
	
</script>