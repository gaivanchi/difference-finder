export const isObject = (data) => data instanceof Object && !Array.isArray(data);

const stringify = (obj, startDepth = 0, replacer = '  ', spacesCount = 2) => {
  const iter = (node, depth) => {
    const keys = Object.keys(node);

    const strings = keys.flatMap((key) => {
      const currentValue = node[key];
      if (isObject(currentValue)) {
        return [
          `${replacer.repeat(spacesCount * depth)}${key}: {`,
          `${iter(currentValue, depth + 1)}`,
          `${replacer.repeat(spacesCount * depth)}}`,
        ];
      }
      return `${replacer.repeat(spacesCount * depth)}${key}: ${currentValue}`;
    });

    const result = strings.join('\n');
    return result;
  };

  return iter(obj, startDepth);
};

const getDiffPart = (key, value, depth, replacer = '    ', action = ' ') => {
  if (!isObject(value)) {
    return `${replacer.repeat(depth)}  ${action} ${key}: ${value}`;
  }
  return [
    `${replacer.repeat(depth)}  ${action} ${key}: {`,
    `${stringify(value, depth + 2)}`,
    `${replacer.repeat(depth + 1)}}`,
  ];
};

export default (AST) => {
  const iter = (tree, depth) => {
    const diffKeys = tree.flatMap((node) => {
      const replacer = '    ';
      const {
        key, oldValue, newValue, status, children,
      } = node;

      switch (status) {
        case 'original':
          return getDiffPart(key, oldValue, depth, replacer);

        case 'updated':
          if (children.length > 0) {
            return [
              `${replacer.repeat(depth)}    ${key}: {`,
              iter(children, depth + 1),
              `${replacer.repeat(depth + 1)}}`,
            ];
          }
          if (isObject(oldValue)) {
            return [
              ...getDiffPart(key, oldValue, depth, replacer, '-'),
              getDiffPart(key, newValue, depth, replacer, '+'),
            ];
          }
          if (isObject(newValue)) {
            return [
              getDiffPart(key, oldValue, depth, replacer, '-'),
              ...getDiffPart(key, newValue, depth, replacer, '+'),
            ];
          }
          return [
            getDiffPart(key, oldValue, depth, replacer, '-'),
            getDiffPart(key, newValue, depth, replacer, '+'),
          ];

        case 'removed':
          return getDiffPart(key, oldValue, depth, replacer, '-');

        case 'added':
          return getDiffPart(key, newValue, depth, replacer, '+');

        default:
          return `node with unexpected status: ${status}`;
      }
    });

    const result = diffKeys.join('\n');

    if (depth === 0) {
      return `{\n${result}\n}`;
    }
    return result;
  };

  return iter(AST, 0);
};
