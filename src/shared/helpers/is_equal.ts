import { isArray, isArrayOrObject } from 'shared/helpers';
import { PlainObject } from 'shared/types/models/plain_object';


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
