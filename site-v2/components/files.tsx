import fs from 'fs';
import path from 'path';

export function listMarkdownFiles(dir: string) {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.md'));
}

export function readFromFile(filename: string) {
  const filePath = path.join(filename);
  const markdown = fs.readFileSync(filePath, 'utf8');
  return markdown;
}
