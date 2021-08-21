import axios from 'axios';
import elUi from 'element-ui';


export default (config ={}) => {
	
	
	let abort =  null;
	const content =  axios({
		method: 'post', 
		
		// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
		timeout: 120000,
		// `withCredentials` 表示跨域请求时是否需要使用凭证
		withCredentials: true,   
		// `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
		responseType: 'json', 
		
		// `onUploadProgress` 允许为上传处理进度事件
		onUploadProgress:  e => {},
		
		// `onDownloadProgress` 允许为下载处理进度事件
		onDownloadProgress:   e => {},
		
		...config,
		
		// 绑定终止请求
		cancelToken: new axios.CancelToken( c => abort = c),
		
		
		
		
		// `headers` 是即将被发送的自定义请求头
		headers: {
			"Content-Type": "application/json",
			...(config.headers || {}),
		},
		
		baseURL: '' ,		
		
			
		 
		
		// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
		transformResponse: [ 
			res => {
				
				
				if((!res || res.Result*1 != 1) && !config.noMsg && (config.responseType === 'json' || !config.responseType) ) elUi.Message.error(res && res.Message || 'Request cancelled');
				
				
				return res || {};
			}
		],
		
		
		
	}).then( res=> res.data).catch(err => {
		if(!config.noMsg) elUi.Message.error(`出现错误：${err}, 请刷新重试`)
		return config.responseType === 'json' || !config.responseType ? {code: 0} : false;
	})
	
	if(!config.expandFun) return content;
	
	
	
	return { abort, content }
	
	
}

