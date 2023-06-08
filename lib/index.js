import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const getExtension = (filepath) => path.extname(filepath).toLowerCase();

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

export default (filepath1, filepath2) => {
  const obj1 = parse(readFile(filepath1), getExtension(filepath1));
  const obj2 = parse(readFile(filepath2), getExtension(filepath2));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const diff = keys.reduce((acc, key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`    ${key}: ${obj1[key]}`);
      } else {
        acc.push(`  - ${key}: ${obj1[key]}`);
        acc.push(`  + ${key}: ${obj2[key]}`);
      }
    } else if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}`);
    } else {
      acc.push(`  + ${key}: ${obj2[key]}`);
    }

    return acc;
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};
