import _ from 'lodash';
import { getContentFile, getObject } from './commander.js';

export default (filepath1, filepath2) => {
  const strFirstFile = getContentFile(filepath1);
  const strSecondFile = getContentFile(filepath2);
  const obj1 = getObject(strFirstFile);
  const obj2 = getObject(strSecondFile);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...keys1, ...keys2].sort();

  let list = keys.map((key) => {
    let str = '';
    if (!_.has(obj1, key)) {
      // 'added'
      str = `${str} + ${key}: ${obj2[key]}`;
    } else if (!_.has(obj2, key)) {
      // 'deleted'
      str = `${str} - ${key}: ${obj1[key]}`;
    } else if (obj1[key] !== obj2[key]) {
      // 'changed'
      str = `${str} - ${key}: ${obj1[key]}\n`;
      str = `${str} + ${key}: ${obj2[key]}`;
    } else {
      // 'unchanged'
      str = `${str}   ${key}: ${obj1[key]}`;
    }
    let arr = str.split('\n');
    arr = _.uniq(arr);
    str = arr.join('\n');
    return str;
  });

  list = _.uniq(list);
  let result = list.join('\n');
  result = `{\n${result}\n}`;
  return result;
};
