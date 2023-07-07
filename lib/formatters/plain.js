import path from 'path';

import { isObject } from './stylish.js';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export default (AST) => {
  const iter = (tree, ancestry) => {
    const diffKeys = tree.flatMap((node) => {
      const {
        key, oldValue, newValue, status, children,
      } = node;

      const newAncestry = path.join(ancestry, key).replace('/', '.');

      if (status === 'original') {
        return [];
      }

      if (status === 'updated') {
        if (children.length > 0) {
          return iter(children, newAncestry);
        }
        return `Property '${newAncestry}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      }

      if (status === 'removed') {
        return `Property '${newAncestry}' was removed`;
      }
      return `Property '${newAncestry}' was added with value: ${formatValue(newValue)}`;
    });

    const result = diffKeys.join('\n');

    return result;
  };

  return iter(AST, '');
};
