import { isArray, isArrayOrObject } from './query_stringify.ts';
import { PlainObject } from '../types/models/plain_object.ts';

export const isEqual = (lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = (rhs as PlainObject)[key];
    if (isArray(lhs) && isArray(rhs)) {
      return lhs.length === rhs.length;
    }

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (!isEqual(value, rightValue)) {
        return false;
      }
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
};
