// 路由列表
export default [
	{
		path: '/student/home',  
		component : ()=> import( '@/views/student/confirmIndex')
	},

			{
				path: '/student/coc',  
				component : ()=> import( '@/views/student/coc'),
				meta:{		
					icon: 'el-icon-mobile',
					title: 'Change of Camopus',
				},
			},
	
			{
				path: '/pages/student/transfer',  
				component : ()=> import( '@/views/student/transfer'),
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
				path: '/pages/student/release',  
				component : ()=> import( '@/views/student/release'),
				meta:{	
					icon: 'el-icon-user',
					title: 'Release or Withdraw',
				},
			}
	
]
