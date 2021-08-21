<style lang="scss" scoped>
	.tb-page {
		width: 100%;
		/deep/ .el-pagination {
			button{
				background: $theme-color1;
				color: #fff;
				border-radius: 20px;
				padding: 0 20px;
			}
			button[disabled]{
				background: black(2);
			}

			.el-pager {
				color: black(6);
				.active{
					color: $theme-color1;
				}
			}
		}
	}
</style>

<template>
	<div class="tb-page">
		<el-pagination :page-size="pageInfo[pageKeys[1]]" :current-page='pageInfo[pageKeys[0]]' @current-change="pageChange"  @size-change='v => pageChange(null,v)' :pager-count="5" layout="prev, pager, sizes, next" :total="pageInfo.total" prev-text="上一页" next-text="下一页" />
	</div>
</template>


<script>
	export default {
		props: {
			pageInfo: {
				type: Object,
				default: ()=>({
					pageSize: 10,
					page: 1,
					total: 0,
					
				})
			},
			// 自定义分页绑定的key   第一个是第几页的key  第二个是总几页的key
			pageKeys:{
				type: Object,
				default: ()=>['page','pageSize']
			}
		},
		data() {
			return {}
		},
		computed: {},
		mounted() {


		},
		methods: {
			pageChange(page,pageSize){
				
				const arr = { ...this.pageInfo};
				if(page !== null) arr[this.pageKeys[0]] = page;
				if(pageSize) arr[this.pageKeys[1]] = pageSize;
				
				this.$emit('update:pageInfo', arr);
				this.$emit('change');
			}
		}

	}
</script>
