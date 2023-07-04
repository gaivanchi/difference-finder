import path from 'path';
import fs from 'fs';
import _ from 'lodash';

import parse from './parsers.js';
import { isObject } from './formatters/stylish.js';
import formatDiffAST from './formatters/index.js';

const getExtension = (filepath) => path.extname(filepath).toLowerCase();

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const buildDiffAST = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const diffAST = keys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];
    let children = [];
    let status;

    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (isObject(oldValue) && isObject(newValue)) {
        children = buildDiffAST(oldValue, newValue);
      }
      status = _.isEqual(oldValue, newValue) ? 'original' : 'updated';
    } else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      status = 'removed';
    } else {
      status = 'added';
    }

    return {
      key, oldValue, newValue, status, children,
    };
  });

  return diffAST;
};

export default (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(readFile(filepath1), getExtension(filepath1));
  const obj2 = parse(readFile(filepath2), getExtension(filepath2));

  const diffAST = buildDiffAST(obj1, obj2);

  const diff = formatDiffAST(diffAST, format);

  return diff;
};
