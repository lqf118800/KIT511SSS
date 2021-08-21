<style lang="scss" scoped>
	.n-nav {
		background: #000;
		height: 60px;
		@include n-row1;
		padding: 0 10px;

		>i,
		/deep/>.el-badge {
			font-size: 24px;
			font-weight: 100;
			color: #fff;
		}

		.n-nav-right {
			margin-left: auto;
		}

		/deep/>.el-badge+*,
		>i+* {
			margin-left: 20px;
		}

		.n-nav-check {
			color: $theme-color1;
		}

		.n-nav-screening {
			@include n-row1;

			/deep/ .el-select {
				margin: 0 10px;
				line-height: 32px;
				text-align: center;

				input {
					height: 32px;
					border-radius: 40px;

				}

				.el-input__suffix i {
					line-height: 32px;
				}
			}


		}


		.n-nav-routes {
			height: 100%;
			@include n-row1;
			align-items: stretch;

			>li {
				padding: 0 40px;
				color: #999;
				@include n-row5;
				cursor: pointer;
				font-size: 16px;
				position: relative;

				>i {
					position: absolute;
					right: 10px;
					top: 50%;
					transform: translate(0, -50%);
					font-size: 14px;
					margin-left: 40px;
				}

				>i:hover {
					color: $theme-color1;
				}
			}

			>li {
				margin-left: 10px;
			}

			>.n-nav-routes-check,
			>li:hover:not(.n-nav-subRoutes) {
				color: #fff;
				border-bottom: 3px solid $theme-color3;
				padding-top: 3px;
			}

			.n-nav-subRoutes {
				z-index: 100;
				position: relative;
				padding: 0 10px;

				>i {
					margin: 0;
					font-size: 20px;

				}

				>ul {
					z-index: 100;
					@include shadow;
					transition: all 0.3s;
					background: #fff;
					min-width: 120px;
					white-space: nowrap;
					position: absolute;
					top: 100%;
					color: #777;
					overflow: hidden;
					left: 0;

					>li {
						height: 50px;
						width: 100%;
						@include n-row2;
						padding: 0 20px;
						cursor: pointer;

						>i {
							font-size: 14px;
							color: #dadada;
							margin-left: 20px;
						}

						>span {
							white-space: nowrap;
							display: inline-block;
							overflow: hidden;
							text-overflow: ellipsis;
							width: 100px;
						}

						>i:hover {
							color: $theme-color1;
						}
					}

					>li:hover {
						background-color: #e8f4ff;
					}

					>.n-nav-routes-check {
						color: $theme-color1;
						background-color: #e8f4ff;
					}
				}

			}
		}
		/deep/ .el-dropdown-link{
			@include n-row5;
			color: #eee;
			margin-left: auto;
			>img{
				width: 40px; 
				height: 40px; 
				border-radius: 50%;
				margin-right: 10px;
			}
		}
	}
</style>

<style>
	.n-nav-msg {
		background: #f00;
	}
	
</style>

<template>
	<div class="n-nav">
		<i :class="  `el-icon-s-${intactSlider ? 'un' : ''}fold` " @click="$emit('update:intactSlider', !intactSlider)"></i>
		<template v-for="item,idx in compList">





			<!-- 图标 -->
			<i :key="'n-nav-comp' +idx" v-if="item.type === 'icon'" @click="btnClick( { btn: item} )" :class="[item.icon,  item.right ? 'n-nav-right' : ''  ]"></i>
			
		 
			<el-dropdown style="margin-left: auto;" :key="'n-nav-comp' +idx" v-if="item.type === 'user'">
				<span class="el-dropdown-link">
					<img src="../../assets/img/1.jpg" />{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

		</template>




	</div>
</template>

<script>
	export default {
		props: {
			intactSlider: {
				type: Boolean,
			},
			params: {
				type: Object,
				default: () => ({})
			},
			compList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				userInfo:{}
			}
		},
		computed: {

		},
		components: {},
		watch: {

		},
		async mounted() {

			this.userInfo = JSON.parse(localStorage.userInfo || "{}")
		},
		beforeDestroy() {},


		methods: {
			// 按钮点击
			btnClick(conf) {
				const clickKey = conf.btn.clickKey;
				// 本身有的函数也会一起执行
				this[clickKey] && this[clickKey](conf);
				this.$emit(clickKey, conf)
			},

			// 跳转
			link({ btn }) {
				this.$router.push(btn.link)
			},

			logout(){
				localStorage.clear()
				this.$router.push('/login')
			}


		},


	}
</script>
