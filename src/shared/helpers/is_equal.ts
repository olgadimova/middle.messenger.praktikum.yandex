import { isArrayOrObject } from 'shared/helpers';

export const isEqual = (lhs: PlainObject | [], rhs: PlainObject | []): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = (rhs as PlainObject)[key];
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
