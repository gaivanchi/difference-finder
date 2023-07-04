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

export default (AST) => {
  const iter = (tree, depth) => {
    const diffKeys = tree.flatMap((node) => {
      const replacer = '    ';
      const {
        key, oldValue, newValue, status, children,
      } = node;

      let diffKey;

      switch (status) {
        case 'original':
          if (children.length > 0) {
            diffKey = [
              `${replacer.repeat(depth)}    ${key}: {`,
              `${stringify(oldValue, depth + 2)}`,
              `${replacer.repeat(depth + 1)}}`,
            ];
          } else {
            diffKey = `${replacer.repeat(depth)}    ${key}: ${oldValue}`;
          }
          break;

        case 'updated':
          if (children.length > 0) {
            diffKey = [
              `${replacer.repeat(depth)}    ${key}: {`,
              iter(children, depth + 1),
              `${replacer.repeat(depth + 1)}}`,
            ];
          } else if (isObject(oldValue)) {
            diffKey = [
              `${replacer.repeat(depth)}  - ${key}: {`,
              `${stringify(oldValue, depth + 2)}`,
              `${replacer.repeat(depth + 1)}}`,
              `${replacer.repeat(depth)}  + ${key}: ${newValue}`,
            ];
          } else if (isObject(newValue)) {
            diffKey = [
              `${replacer.repeat(depth)}  - ${key}: ${oldValue}`,
              `${replacer.repeat(depth)}  + ${key}: {`,
              `${stringify(newValue, depth + 2)}`,
              `${replacer.repeat(depth + 1)}}`,
            ];
          } else {
            diffKey = [
              `${replacer.repeat(depth)}  - ${key}: ${oldValue}`,
              `${replacer.repeat(depth)}  + ${key}: ${newValue}`,
            ];
          }
          break;

        case 'removed':
          if (!isObject(oldValue)) {
            diffKey = `${replacer.repeat(depth)}  - ${key}: ${oldValue}`;
          } else {
            diffKey = [
              `${replacer.repeat(depth)}  - ${key}: {`,
              `${stringify(oldValue, depth + 2)}`,
              `${replacer.repeat(depth + 1)}}`,
            ];
          }
          break;

        case 'added':
          if (!isObject(newValue)) {
            diffKey = `${replacer.repeat(depth)}  + ${key}: ${newValue}`;
          } else {
            diffKey = [
              `${replacer.repeat(depth)}  + ${key}: {`,
              `${stringify(newValue, depth + 2)}`,
              `${replacer.repeat(depth + 1)}}`,
            ];
          }
          break;

        default:
          return 'node with unexpected status';
      }

      return diffKey;
    });

    const result = diffKeys.join('\n');

    if (depth === 0) {
      return `{\n${result}\n}`;
    }
    return `${result}`;
  };

  return iter(AST, 0);
};
