#!/usr/bin/env node
import { Command } from 'commander';
import path, { dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

// import sortBy from 'lodash';
// process.cwd() показывает текующуу рабочую директорию
// path.resolve() выводит глобальный путь


const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.8.0')
    .option('-f, --format <type>','output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
       
        const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
        const getContentFile = (fixturePath) => fs.readFileSync(fixturePath, 'UTF-8');
        const getObject = (str) => JSON.parse(str);
        
        const firstPath = getFixturePath(filepath1);
        const secondPath = getFixturePath(filepath2);
        
        const strFirstFile = (getContentFile(firstPath));
        const strSecondFile = (getContentFile(secondPath));
        
        const objContentFirstFile = getObject(strFirstFile);
        const objContentSecondFile = getObject(strSecondFile);

        const gendiff = (data1, data2) => {
            const keys1 = Object.keys(data1)
            const keys2 = Object.keys(data2)
            const keys = [...keys1, ...keys2]
            const result = {}

            for (const key of keys) {
              if (!Object.hasOwn(data1, key)) {
                result[key] = 'added'
              } else if (!Object.hasOwn(data2, key)) {
                result[key] = 'deleted'
              } else if (data1[key] !== data2[key]) {
                result[key] = 'changed'
              } else {
                result[key] = 'unchanged'
              }
            }       
            return result
        }

        console.log(gendiff(objContentFirstFile, objContentSecondFile))
        // можем добавлять массив [key, valuee]
        // {
        //     - follow: false
        //       host: hexlet.io
        //     - proxy: 123.234.53.22
        //     - timeout: 50
        //     + timeout: 20
        //     + verbose: true
        // }
    });

program.parse();