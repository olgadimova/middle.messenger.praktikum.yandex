import { queryStringify } from 'shared/helpers';

enum FetchMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestUrlType = string;

type RequestOptionsType = {
  method?: string;
  data?: Record<string, string | number | unknown[]> | FormData;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  withCredentials?: boolean;
  params?: Record<string, string | number>;
};

/* Имплементация по типу fetch для отправки api запросов */
export class HTTP {
  private _prefix = 'https://ya-praktikum.tech/api/v2';

  constructor(prefix: string) {
    this._prefix += prefix;
  }

  public get = (url: RequestUrlType, options?: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.GET }, options?.timeout);

  public post = (url: RequestUrlType, options?: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.POST }, options?.timeout);

  public put = (url: RequestUrlType, options?: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.PUT }, options?.timeout);

  public delete = (url: RequestUrlType, options?: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.DELETE }, options?.timeout);

  public request = (
    url: RequestUrlType,
    options: RequestOptionsType,
    timeout = 5000,
  ): Promise<XMLHttpRequest['response'] | void> => {
    const { method = FetchMethodsEnum.GET, data, headers = {}, withCredentials = true, params } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const isGet = method === FetchMethodsEnum.GET;
      xhr.open(method, isGet && !!params ? `${this._prefix}?${url}${queryStringify(params)}` : `${this._prefix}${url}`);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        const status = xhr.status || 0;
        if (status >= 200 && status < 300) {
          resolve(xhr.response);
        } else {
          const message = {
            '0': 'abort',
            '100': 'Information',
            '200': 'Ok',
            '300': 'Redirect failed',
            '400': 'Access error',
            '500': 'Internal server error',
          }[Math.floor(status / 100) * 100];
          reject(new Error(xhr.response?.reason || message));
        }
      };

      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onabort = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.responseType = 'json';

      if (method === FetchMethodsEnum.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export async function fetchWithRetry(
  prefix: string,
  url: RequestUrlType,
  options: RequestOptionsType,
): Promise<XMLHttpRequest | Error | void> {
  const fetch = new HTTP(prefix);

  try {
    const response = await fetch.request(url, options);
    return response;
  } catch (err) {
    if (!options.retries) {
      throw new Error('Не удалось отправить запрос');
    }
    return fetchWithRetry(prefix, url, { ...options, retries: options.retries - 1 });
  }
}
