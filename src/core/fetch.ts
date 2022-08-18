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
  private _BASE_URL: string;

  constructor(baseurl = 'https://ya-praktikum.tech/api/v2') {
    this._BASE_URL = baseurl;
  }

  get = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    if (options && options.data) {
      url = `${url}${queryStringify(options.data)}`;
    }
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: IOptions): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: IOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, data, headers = { 'Content-Type': 'application/json' } } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method as METHODS, `${this._BASE_URL}${url}`);

      Object.keys(headers).forEach((key) => {
        if (key.toLowerCase() === 'content-type' && headers[key].toLowerCase() !== 'multipart/form-data') {
          xhr.setRequestHeader(key, headers[key]);
        }
      });

      xhr.withCredentials = true;

      xhr.onload = function () {
        if (this.status === 200) {
          resolve(xhr);
        } else {
          alert(this.response);
          reject(this.response);
        }
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (Object.values(headers).includes('multipart/form-data')) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
