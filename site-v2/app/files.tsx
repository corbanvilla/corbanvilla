import fs from 'fs';
import path from 'path';

export function readFromFile(filename: string) {
  const filePath = path.join(filename);
  const markdown = fs.readFileSync(filePath, 'utf8');
  return markdown;
}
