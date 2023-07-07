import formatInStylish from './stylish.js';
import formatInPlain from './plain.js';

export default (AST, format) => {
  switch (format) {
    case 'stylish':
      return formatInStylish(AST);
    case 'plain':
      return formatInPlain(AST);
    case 'json':
      return JSON.stringify(AST);
    default:
      throw new Error(`Format '${format}' is not supported`);
  }
};
