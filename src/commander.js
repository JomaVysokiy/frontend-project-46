import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

const getContentFile = (fixturePath) => fs.readFileSync(fixturePath, 'UTF-8');

const getObject = (str) => JSON.parse(str);

export { getFixturePath, getContentFile, getObject };
