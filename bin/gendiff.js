#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import genDiff from '../lib/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const program = new Command();  

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const fullPath1 = buildFullPath(filepath1);
    const fullPath2 = buildFullPath(filepath2);

    console.log(genDiff(fullPath1, fullPath2, options.format));
  });

program.parse();
