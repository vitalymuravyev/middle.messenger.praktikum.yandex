// eslint-disable-next-line no-shadow
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
  method: METHODS;
}

const queryStringify = (data: Record<string, string>): string => {
  const str = Object.keys(data).reduce((acc, key) => [...acc, (`${key}=${data[key]}`)], []);

  return `?${str.join('&')}`;
};

class HTTPTransport {
  get = (url: string, options: IOptions = { method: METHODS.GET }): Promise<XMLHttpRequest> => {
    if (options && options.data) {
      // eslint-disable-next-line no-param-reassign
      url = `${url}${queryStringify(options.data)}`;
    }
    return this.request(url, options, options.timeout);
  };

  // eslint-disable-next-line arrow-body-style
  post = (url: string, options: IOptions = { method: METHODS.POST }): Promise<XMLHttpRequest> => {
    return this.request(url, options, options.timeout);
  };

  // eslint-disable-next-line arrow-body-style
  put = (url: string, options: IOptions = { method: METHODS.PUT }): Promise<XMLHttpRequest> => {
    return this.request(url, options, options.timeout);
  };

  // eslint-disable-next-line arrow-body-style
  delete = (url: string, options: IOptions = { method: METHODS.DELETE }): Promise<XMLHttpRequest> => {
    return this.request(url, options, options.timeout);
  };

  request = (url: string, options: IOptions = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
