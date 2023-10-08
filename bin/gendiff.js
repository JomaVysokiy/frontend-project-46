#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';
import { getFixturePath, getContentFile, getObject } from '../src/commander.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const firstPath = getFixturePath(filepath1);
    const secondPath = getFixturePath(filepath2);
    const strFirstFile = getContentFile(firstPath);
    const strSecondFile = getContentFile(secondPath);
    const objContentFirstFile = getObject(strFirstFile);
    const objContentSecondFile = getObject(strSecondFile);
    console.log(gendiff(objContentFirstFile, objContentSecondFile));
  });

program.parse();
