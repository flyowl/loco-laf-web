


// import axios from 'axios';


import service from 'src/apis/request';


export function createAxiosFetchHandler(config?: Record<string, unknown>) {
  return async function(options: RuntimeOptionsConfig) {
    const requestConfig: RequestOptions = {
      ...options,
      url: options.uri,
      method: options.method as RequestOptions['method'],
      data: options.params,
      headers: options.headers,
      ...config,
    };
    const response = await service(requestConfig);
    return response;
  };
}