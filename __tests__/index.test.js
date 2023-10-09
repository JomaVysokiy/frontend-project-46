import { Command } from 'commander';
import gendiff from '../src/index.js';
import { getFixturePath, getContentFile, getObject } from '../src/commander.js';
import { test, expect, beforeEach } from '@jest/globals';

test('gendiff file1.yml and file2.yml', (filepath1, filepath2) => {
    const firstPath = getFixturePath(filepath1);
    const secondPath = getFixturePath(filepath2);
    const strFirstFile = getContentFile(firstPath);
    const strSecondFile = getContentFile(secondPath);
    const objContentFirstFile = getObject(strFirstFile);
    const objContentSecondFile = getObject(strSecondFile);
    const result = gendiff(objContentFirstFile, objContentSecondFile)
    expect(gendiff(objContentFirstFile, objContentSecondFile)).toEqual(result);
})