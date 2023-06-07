import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const readAndParse = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const extension = path.extname(fullPath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      return null;
  }
};

export default (filepath1, filepath2) => {
  const data1 = readAndParse(filepath1);
  const data2 = readAndParse(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const diff = keys.reduce((acc, key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        acc.push(`    ${key}: ${data1[key]}`);
      } else {
        acc.push(`  - ${key}: ${data1[key]}`);
        acc.push(`  + ${key}: ${data2[key]}`);
      }
    } else if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      acc.push(`  - ${key}: ${data1[key]}`);
    } else {
      acc.push(`  + ${key}: ${data2[key]}`);
    }

    return acc;
  }, []);

  return `{\n${diff.join('\n')}\n}`;
};
