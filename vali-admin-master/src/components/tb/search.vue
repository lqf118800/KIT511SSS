<style lang="scss" scoped>
	.tb-search {
		width: 100%;
		overflow: hidden;
		background: #fff;
		font-size: 14px;
		@include n-row1;
		flex-wrap: wrap;
		/deep/ >div{
			margin: 10px 0;
			padding: 0 10px;
			@include n-row1;
			overflow: hidden;
			width:  33.33%;
			>span{
				display: inline-block;
				width: 25%;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 20px;
				text-align: right;
				i{
					font-size: 16px;
				}
			}
			
			
			
			.el-checkbox-group{
				width: 100%;
			}
			
			>.el-date-editor,>.el-select, >.el-input,.el-checkbox-group{
				flex:  1;
				
			}
			.el-checkbox{
				margin:10px 20px 10px 0;
			}
		}
		.tb-search-line{
			flex: 0 1 100%;
		}
		.tb-search-right{
			margin-left: auto;
		}
		.tb-search-childRight{
			justify-content: flex-end;
		}
		
		 
	}
</style>

<template>
	<div class="tb-search">
		<div v-for="(item,idx) in compList.filter(v=> !v.hide)" :key="idx" :class="{'tb-search-line': item.line ,'tb-search-childRight': item.childRight,'tb-search-right': item.right  } ">
			<span v-show='item.label'  class="tb-search-label">
				{{item.label}}
				<el-popover v-if="item.msg" placement="top"   trigger="hover" :content="item.msg">
				    <i slot="reference" class="fa fa-question-circle-o"></i>
				</el-popover>
			</span>


			<el-select  v-if='item.type === "select"'  v-on="item.on"  v-bind="{clearable:true, placeholder:'请选择',  ...item.props}"   v-model="searchVals[item.k]" >
				<el-option v-for="option in item.options || []" :key="$base.symbol()" v-bind="option" />
			</el-select>
			



			<el-input v-if='item.type === "text"' v-on="item.on" v-model="searchVals[item.k]" v-bind="{clearable:true, placeholder:'请输入内容',  ...item.props}"   />
			
			<div v-if='item.type === "title"' v-on="item.on" v-bind="item.props" >{{item.title}}</div>


			<el-date-picker   v-if='item.type === "date"' v-on="item.on"  v-bind="{clearable:true, 'start-placeholder':'开始日期', 'end-placeholder':'结束日期', type:'daterange', placeholder:'请输入内容', 'value-format': 'yyyy-MM-dd',  ...item.props}"   v-model="searchVals[item.k]"  :picker-options="pickerOptions"/>
			
			
			<template v-if='item.type === "btns"'>
				<el-button v-for="btn in item.btns" v-on="btn.on" :key="$base.symbol()" v-bind="btn.props"  @click='btnClick(btn)'>
					{{btn.label}}
					<el-popover  v-if="btn.msg" placement="top"   trigger="hover" :content="btn.msg">
					    <i slot="reference" style="margin-left: 3px;" class="fa fa-question-circle-o"></i>
					</el-popover>
				</el-button>
			</template>
			
		</div>
		
		
		
	
	</div>
</template>


<script>
	export default {
		props: {
			searchVals: {
				type: Object,
				default: ()=>({}),
				required: true
			},
			compList: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				      pickerOptions: { //控制时间范围
disabledDate (time) {
return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
}
},

			}
		},
		computed: {},
		mounted() {
		},
		methods: {
					
			btnClick(btn) {
				this.$emit('btnClick', {btn});
			}
		}

	}
</script>
