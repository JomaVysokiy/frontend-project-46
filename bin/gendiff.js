#!/usr/bin/env node
import { Command } from 'commander';
import path, { dirname } from 'path';
import fs from 'fs';
import _ from 'lodash'
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
            const keys = [...keys1, ...keys2].sort()
 
            ///////////////////
            console.log(keys)
            let str = '';
            let arr = []
            // result
            for (const key of keys) {
              if (!Object.hasOwn(data1, key)) {
                // 'added'
                str = `${str} + ${key}: ${data2[key]}, \n`
              } else if (!Object.hasOwn(data2, key)) {
                // 'deleted'
                str = `${str} - ${key}: ${data1[key]}, \n`
              } else if (data1[key] !== data2[key]) {
                // 'changed'
                str = `${str} - ${key}: ${data1[key]}, \n`
                str = `${str} + ${key}: ${data2[key]}, \n`
              } else {
                // 'unchanged'
                str = `${str}   ${key}: ${data1[key]}, \n`
              }

              arr = str.split('\n')
              arr = _.uniq(arr)
              str = arr.join('\n')
            }    
            return `{\n${str}}`
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