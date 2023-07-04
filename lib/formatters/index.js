import formatInStylish from './stylish.js';

export default (AST, format) => {
  switch (format) {
    case 'stylish':
      return formatInStylish(AST);
    default:
      throw new Error(`Format '${format}' is not supported`);
  }
};
