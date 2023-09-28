import _ from "lodash";
export default (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = [...keys1, ...keys2].sort();
  // const keys = _.sortBy[...keys1, ...keys2, ];

  console.log(keys);
  let str = "";
  let arr = [];

  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      // 'added'
      str = `${str} + ${key}: ${data2[key]}, \n`;
    } else if (!Object.hasOwn(data2, key)) {
      // 'deleted'
      str = `${str} - ${key}: ${data1[key]}, \n`;
    } else if (data1[key] !== data2[key]) {
      // 'changed'
      str = `${str} - ${key}: ${data1[key]}, \n`;
      str = `${str} + ${key}: ${data2[key]}, \n`;
    } else {
      // 'unchanged'
      str = `${str}   ${key}: ${data1[key]}, \n`;
    }

    arr = str.split("\n");
    arr = _.uniq(arr);
    str = arr.join("\n");
  }
  return `{\n${str}}`;
};
