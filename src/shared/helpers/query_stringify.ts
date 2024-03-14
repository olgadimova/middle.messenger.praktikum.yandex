type PlainObject<T = unknown> = {
  [k in string]: T;
};

export const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' &&
  value !== null &&
  value.constructor === Object &&
  Object.prototype.toString.call(value) === '[object Object]';

export const isArray = (value: unknown): value is [] => Array.isArray(value);

export const isArrayOrObject = (value: unknown): value is [] | PlainObject => isPlainObject(value) || isArray(value);

export const getKey = (key: string, parentKey?: string) => (parentKey ? `${parentKey}[${key}]` : key);

export const getParams = (data: PlainObject | [], parentKey?: string) => {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
};

export const queryStringify = (data: PlainObject): string => {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
};
