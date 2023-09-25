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

        const arrOfFirst = Object.entries(objContentFirstFile);
        const arrOfSecond = Object.entries(objContentSecondFile);

        const arrWithPaths = arrOfFirst.concat(arrOfSecond)

        // console.log(objContentFirstFile)
        // console.log(objContentSecondFile)
        console.log(arrWithPaths)

        // выводит совпадение,но при работе совместно с массивом не работает
        // if (Object.hasOwn(objContentFirstFile, 'host') &&
        // Object.hasOwn(objContentFirstFile, 'host')) {
        //     let newObj = {}
        //     newObj.host = objContentFirstFile.host
        //     console.log(newObj)
        // }

    
        const getCoincidences = (arrWithPaths) => {
            let newObj = {};
            for (let [key, value] of arrWithPaths) {
                if (Object.hasOwn(newObj, key)) {
                    
                }
            }    
            return newObj 
        }

        // for (let [key, value] of arrWithPaths) {
        //     if (Object.hasOwn())
        // }

        const coincidences = getCoincidences(arrWithPaths)
        console.log(coincidences)
       
    });

program.parse();