import { queryStringify } from 'shared/helpers';

enum FetchMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestUrlType = string;

type RequestOptionsType = {
  method: string;
  data?: Record<string, string | number>;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
};

/* Имплементация по типу fetch для отправки api запросов */
export class HTTPTransport {
  public get = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.GET }, options.timeout);

  public post = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.POST }, options.timeout);

  public put = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.PUT }, options.timeout);

  public delete = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.DELETE }, options.timeout);

  public request = (
    url: RequestUrlType,
    options: RequestOptionsType = { method: FetchMethodsEnum.GET },
    timeout = 5000,
  ): Promise<XMLHttpRequest | void> => {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const isGet = method === FetchMethodsEnum.GET;

      xhr.open(method, isGet && !!data ? `?${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.onabort = reject;

      if (method === FetchMethodsEnum.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export async function fetchWithRetry(
  url: RequestUrlType,
  options: RequestOptionsType,
): Promise<XMLHttpRequest | Error | void> {
  const fetch = new HTTPTransport();

  try {
    const response = await fetch.request(url, options);
    return response;
  } catch (err) {
    if (!options.retries) {
      throw new Error('Не удалось отправить запрос');
    }
    return fetchWithRetry(url, { ...options, retries: options.retries - 1 });
  }
}
