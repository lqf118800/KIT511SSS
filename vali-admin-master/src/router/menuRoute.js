// 路由列表
export default [
	

			{
				path: '/pages/student/coc',  
				component : ()=> import( '@/views/student/coc'),
				meta:{		
					icon: 'el-icon-mobile',
					title: 'Change of Camopus',
				},
			},
	
			{
				path: '/pages/student/examine',  
				component : ()=> import( '@/views/student/examine'),
				meta:{	
					icon: 'el-icon-zoom-in',
					title: 'Credit Transfer',
				},
			},
			{
				path: '/pages/student/absence',  
				component : ()=> import( '@/views/student/absence'),
				meta:{	
					icon: 'el-icon-user',
					title: 'Leave of Absence',
				},
			},
			{
				path: '/pages/student/deferment',  
				component : ()=> import( '@/views/student/deferment'),
				meta:{	
					icon: 'el-icon-user',
					title: 'Deferment',
				},
			},
			{
				path: '/pages/student/userInfo',  
				component : ()=> import( '@/views/student/userInfo'),
				meta:{	
					icon: 'el-icon-user',
					title: 'Release or Withdraw',
				},
			}
	
]
