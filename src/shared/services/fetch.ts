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

export function queryStringify(data: Record<string, string | number>) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

/* Имплементация по типу fetch для отправки api запросов */
class HTTPTransport {
  get = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.GET }, options.timeout);

  post = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.POST }, options.timeout);

  put = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.PUT }, options.timeout);

  delete = (url: RequestUrlType, options: RequestOptionsType) =>
    this.request(url, { ...options, method: FetchMethodsEnum.DELETE }, options.timeout);

  request = (
    url: RequestUrlType,
    options: RequestOptionsType = { method: FetchMethodsEnum.GET },
    timeout = 5000,
  ): Promise<XMLHttpRequest | void> => {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const isGet = method === FetchMethodsEnum.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

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
