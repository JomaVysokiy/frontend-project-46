import _ from 'lodash';

export default (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = [...keys1, ...keys2].sort();

  let list = keys.map((key) => {
    let str = '';
    if (!_.has(data1, key)) {
      // 'added'
      str = `${str} + ${key}: ${data2[key]}`;
    } else if (!_.has(data2, key)) {
      // 'deleted'
      str = `${str} - ${key}: ${data1[key]}`;
    } else if (data1[key] !== data2[key]) {
      // 'changed'
      str = `${str} - ${key}: ${data1[key]}\n`;
      str = `${str} + ${key}: ${data2[key]}`;
    } else {
      // 'unchanged'
      str = `${str}   ${key}: ${data1[key]}`;
    }
    let arr = str.split('\n');
    arr = _.uniq(arr);
    str = arr.join('\n');
    return str;
  });

  list = _.uniq(list);
  let result = list.join('\n');
  result = `{\n${result}\n}`;
  return result
};
