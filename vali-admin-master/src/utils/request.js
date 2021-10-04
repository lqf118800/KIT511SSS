import axios from 'axios';
import elUi from 'element-ui';


export default (config ={}) => {
	
	
	let abort =  null;
	const content =  axios({
		method: 'post', 
		
		// `timeout` Specify the number of milliseconds for the request timeout (0 for no timeout)
		timeout: 120000,
		// `withCredentials` Indicates whether credentials are required for cross-domain requests
		withCredentials: true,   
		// `responseType` The type of data that represents the server's response, which can be 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
		responseType: 'json', 
		
		// `onUploadProgress` Allow progress events to be processed for uploads
		onUploadProgress:  e => {},
		
		// `onDownloadProgress` Progress events are allowed to be processed for downloads
		onDownloadProgress:   e => {},
		
		...config,
		
		// The binding terminates the request
		cancelToken: new axios.CancelToken( c => abort = c),
		
		
		
		
		// `headers` is the custom request header that is about to be sent
		headers: {
			"Content-Type": "application/json",
			...(config.headers || {}),
		},
		
		baseURL: '' ,		
		
			
		 
		
		// `transformResponse` Allows you to modify the response data before passing it to then/catch
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

