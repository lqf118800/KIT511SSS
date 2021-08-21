<style lang="scss" scoped>
	@mixin line {
		width: 100%;
		height: 60px;
		// overflow: hidden;
		white-space: nowrap;
		user-select: none;
		font-size: 15px;
	}

	.n-slider-node {
		@include line;
		height: auto;
		position: relative;
		transition: all 0.5s;
		color: #ccc;
		.n-slider-node-line {
			@include line;
			@include n-row5;
			padding: 0 24px;
			cursor: pointer;

			>i {
				transition: all 0.5s;
				margin-right: 10px;
			}
			>span{
				@include n-row1;
				>i{
					width: 59px;
					font-size: 19px;
					@include n-row2;
				}
			}
		}
		.n-slider-node-line:hover{
			background-color: #000;
			
		}
		.n-slider-sub{
			width: 100%;
			transition: height 0.5s;
			overflow: hidden;
		}
		&:hover >.n-slider-subRight{
			opacity: 1;
			box-shadow: 4px 4px 16px 1px rgba(0,0,0,0.12);
			display: block;
			width: 160px;
			opacity: 1;
			overflow: visible;
			transform: translate(100%);
		}
		.n-slider-subRight{
			position: absolute;
			transition: all 0.5s;
			background: #fff;
			top: 0;
			overflow: hidden;
			width: 0px;
			opacity: 0;
			border-radius: 3px;
			right: 0;
			transform: translate(90%);
			.n-slider-seat{
				display: none !important;
			}
		}
		
		
	}
	
	.n-slider-node-check {
		color: #fff;
		background: #000;
	}
</style>

<template>
	<div  class="n-slider-node"  >

		<div :style='{ "padding-left": padLeft + "px" }'  :class='{"n-slider-node-check":slider.curr.path === menu.path ,"n-slider-node-line" : 1}'  @click='changeMenu()'>
			<span >
				<i v-if="menu.meta.icon" :class="menu.meta.icon"></i>
				<i v-else class="n-slider-seat"></i>
				<span v-show="!slider.intactSlider || !top">{{menu.meta.title}}</span>
				
			</span> 
			<i v-show="children.length && !slider.intactSlider" :style='{transform : menu.open ? "rotateZ(90deg)" : "" }' class="el-icon-arrow-right"></i>
		</div>
		
		<!-- 展开侧边栏时候的下拉菜单  固定在下边-->
		<div class="n-slider-sub" :style="{height : (slider.intactSlider ? 0 : subMenuHeight)  + 'px'  }" v-if="children.length" >
			<n-slider-node  v-for="item in children " :menu='item' :key='item.name' :pad-left="padLeft+ 10" />
		</div>
		
		<!-- 不展开侧边栏时候的下拉菜单   固定在右边 -->
		<div class="n-slider-subRight" :style="{height : children.length * 60 + 'px'  }" v-if="children.length && slider.intactSlider" >
			<n-slider-node  v-for="item in children " :menu='item' :key='item.name' :pad-left="10" />
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			padLeft: {
				type: Number,
				default: 0
			},
			top: Boolean,
			menu: {
				type: Object,
				default: () => ({})
			}
		},
		inject:['slider'],
		components: {
			'n-slider-node': () => import('./slider-node')
		},
		computed:{
			menuHeight(){
				let [h,i,arr] = [0,0, [this.menu] ];
				while(i < arr.length){
					const v = arr[i];
					if(!v.hide ) h+=1;
					if(v.open && v.children && v.children.length) arr.push( ...v.children);
					i++;
				}
				return  (this.slider.intactSlider ? 1 : h) * 60 ;
			},
			subMenuHeight(){
				let [h,i,arr] = [0,0, [this.menu] ];
				while(i < arr.length){
					const v = arr[i];
					if(!v.hide ) h+=1;
					if(v.open && v.children && v.children.length) arr.push( ...v.children);
					i++;
				}
				return   (h - 1) * 60 ;
			},
			children(){
				return this.menu.children ? this.menu.children.filter(v=>  !v.hide) : []
			}
		},
		data() {
			return {
				hover:0,
			}
		},
		mounted(){
			
		},
		methods:{
			changeMenu(){
				if(!this.slider.intactSlider)  this.menu.open = !this.menu.open;
				if(!this.children.length) this.slider.curr = this.menu
			}
		}

	}
</script>
