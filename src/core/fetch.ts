import queryStringify from '../utils/queryStringify';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IOptions {
  data?: any;
  timeout?: number;
  headers?: any;
  method?: METHODS;
}

export class HTTPTransport {
  private _BASE_URL = 'https://ya-praktikum.tech/api/v2';

  get = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    if (options && options.data) {
      // eslint-disable-next-line no-param-reassign
      url = `${url}${queryStringify(options.data)}`;
    }
    return this.request(url, { ... options, method: METHODS.GET }, options.timeout);
  };

  // eslint-disable-next-line arrow-body-style
  post = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  // eslint-disable-next-line arrow-body-style
  put = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  // eslint-disable-next-line arrow-body-style
  delete = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: IOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, data, headers = { 'Content-Type': 'application/json' } } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${this._BASE_URL}${url}`);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;

      xhr.onload = function () {
        if (this.status === 200) {
          resolve(xhr);
        } else {
          alert(this.response)
          reject(new Error(this.statusText))
        }
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
