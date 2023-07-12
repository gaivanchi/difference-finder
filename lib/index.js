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
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const diffAST = keys
    .map((key) => {
      const oldValue = obj1[key];
      const newValue = obj2[key];

      const node = {
        key, oldValue, newValue, status: 'original', children: [],
      };

      if (!Object.hasOwn(obj1, key)) {
        return { ...node, status: 'added' };
      }
      if (!Object.hasOwn(obj2, key)) {
        return { ...node, status: 'removed' };
      }
      if (!_.isEqual(oldValue, newValue)) {
        return { ...node, status: 'updated' };
      }
      return node;
    })

    .map((node) => {
      const { oldValue, newValue } = node;

      if (isObject(oldValue) && isObject(newValue)) {
        return { ...node, children: buildDiffAST(oldValue, newValue) };
      }
      return node;
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
