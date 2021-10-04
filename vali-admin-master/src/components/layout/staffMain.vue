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
		//When an element appears, active is used to define the time, curve, etc. of the animation
		.anim-enter-active{
			transform-style:preserve-3d;
		    transition: all 0.3s ;
		}
		//The last frame state of the animation when the element appears
		.anim-enter-to{
			transform: translate(0%);
			opacity: 1;
		}
		//The first frame state of the animation when the element disappears 
		.anim-leave{
			transform: translate(0%);
		    opacity: 1;
		}
		//When an element disappears, active is used to define the time, curve, etc. of the animation
		.anim-leave-active{
			transform-style:preserve-3d;
		    transition: all 0.3s ;
		    
		}
		//The last frame state of the animation when the element disappears
		.anim-leave-to{
			transform: translate(10%);
			opacity: 0.1;
		}
		
	}
</style>

<template>
	<div class="n-main">
		
		<!-- <n-slider  :intactSlider="intactSlider" /> -->
		<div class="n-main-right">
			<n-nav :compList="navCompList"  />
			<main>
				<transition   name="anim"  mode="out-in">
					<router-view></router-view>
				</transition>
			</main>
		</div>
		
		
	</div>
</template>
	

<script>
	import routes from '@/router/staffMenu.js'
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