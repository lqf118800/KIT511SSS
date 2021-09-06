// 路由列表
export default [
	


    {
        path: '/staff/apply',  
        component : ()=> import( '@/views/staff/apply'),
        meta:{	
            icon: 'el-icon-user',
            title: 'apply list',
        },
    }

]
