<template>
	<el-table   v-bind="conf" class="el-table-theme" @selection-change="selChange" @sort-change="sortChange"  >
		<template v-for="(item,idx) in colList">
			<!-- 序号列 -->
			<el-table-column  v-if="item.type === 'index' && isShow({item})" v-on="item.on"  v-bind="{type: 'index', ...item.props}" :key="'col'+idx" />
			<!-- 多选列 -->
			<el-table-column  v-if="item.type === 'select' && isShow({item})" v-on="item.on" v-bind="{type: 'selection', ...item.props}" :key="'col'+idx" />
			
			<!-- 普通数据 -->
			<el-table-column  v-if="!item.type || item.type === 'def'"  v-on="item.on"    v-bind="item.props" :key="'col'+idx" >
				<template #header >
					{{item.props.label}}
					<!-- 额外信息 -->
					<el-popover v-if="item.msg" placement="top"   trigger="hover" :content="item.msg"><i slot="reference" class="fa fa-question-circle-o"></i></el-popover>
				</template>
			</el-table-column>
			
			<!-- 事件列 -->
			<el-table-column  v-if="item.type === 'event'" v-on="item.on"    v-bind="item.props" :key="'col'+idx" >
				<template #header >
					{{item.props.label}}
					<el-popover v-if="item.msg" placement="top"   trigger="hover" :content="item.msg"><i slot="reference" class="fa fa-question-circle-o"></i></el-popover>
				</template>
				
				<template #default="{row}"  >
					<span class="theme-color1 pointer" v-if="isShow({item,row}) "  @click="btnClick({btn:{ clickKey: item.clickKey},row,col:item})">{{row[item.props.prop]}}</span>
				</template>
			</el-table-column>
			
			 
			 
		 
			
			<!-- 操作列 -->
			<el-table-column v-if="item.type === 'operate' " v-on="item.on"   v-bind="item.props" :key="'col'+idx" >
				<template #default="{row}" >
					<template  v-if="isShow({item,row}) " v-for="btn in item.btns">
						<el-button v-if="!btn.type || btn.type === 'def'"  :key="$base.symbol()" @click='btnClick({btn,row,col:item})' v-on="btn.on"   v-bind="{  type: 'text', ...btn.props }"  >
							{{btn.label}}
							<el-popover v-if="btn.msg" placement="top"   trigger="hover" :content="btn.msg"><i slot="reference" class="fa fa-question-circle-o"></i></el-popover>
						</el-button>
						
					</template>
					
				</template>
			</el-table-column>
			
		</template>
	</el-table>
</template>

<script>
	export default {
		props:{
			conf:{
				type: Object,
				default:()=> ({ data: [] })
			},
			selChange:{
				type: Function,
				default: ()=> ()=>{}
			},
			sortChange:{
				type: Function,
				default: ()=> ()=>{}
			},
			colList:{
				type: Array,
				default: ()=> []
			},
		},
		data() {
			return {
			}
		},
		watch:{
			
		},
		
		mounted(){
			
		},
		components: {
		},
		methods: {
			// 查询按钮点击
			btnClick(conf){
				const clickKey = conf.btn.clickKey;
				// 本身有的函数也会一起执行
				this[clickKey] && this[clickKey](conf);
				this.$emit('btnClick',conf)
			},
			// 是否显示
			isShow(opt){
				if(!opt.item.showFunc || this.$base.isType(opt.item.showFunc) !== 'function') return 1;
				return opt.item.showFunc({...opt,vm:this})
			},
		 
			
			
			
			
		}
	
	}
	
	
</script>