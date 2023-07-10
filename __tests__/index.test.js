import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff with JSON files (default "stylish" format)', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const diff = genDiff(filepath1, filepath2);
  const result = readFile('result_stylish.txt');

  expect(diff).toBe(result);
});

test('gendiff with YAML files (default "stylish" format)', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  const diff = genDiff(filepath1, filepath2);
  const result = readFile('result_stylish.txt');

  expect(diff).toBe(result);
});

test('gendiff with JSON files ("plain" format)', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const diff = genDiff(filepath1, filepath2, 'plain');
  const result = readFile('result_plain.txt');

  expect(diff).toBe(result);
});

test('gendiff with YAML files ("plain" format)', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  const diff = genDiff(filepath1, filepath2, 'plain');
  const result = readFile('result_plain.txt');

  expect(diff).toBe(result);
});

test('gendiff with JSON files ("json" format)', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const diff = genDiff(filepath1, filepath2, 'json');
  const result = readFile('result_json.txt');

  expect(diff).toBe(result);
});

test('gendiff with YAML files ("json" format)', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yaml');

  const diff = genDiff(filepath1, filepath2, 'json');
  const result = readFile('result_json.txt');

  expect(diff).toBe(result);
});
