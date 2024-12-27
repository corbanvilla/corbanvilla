import fs from 'fs';
import path from 'path';

export function buildDocTree(dir: string) {
  const tree: any = {};
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      tree[file] = buildDocTree(filePath);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      tree[file] = null;
    }
  });
  return tree;
}

function listDirsRecursively(currentDir: string): string[] {
  const results: string[] = [];
  const files = fs.readdirSync(currentDir);
  files.forEach(file => {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results.push(filePath);
      results.push(...listDirsRecursively(filePath));
    }
  });
  return results;
}

export function listDirsRecursivelyRelative(currentDir: string): string[] {
  return listDirsRecursively(currentDir).map(dir => path.relative(currentDir, dir));
}

function listFilesRecursively(currentDir: string): string[] {
  const results: string[] = [];
  const files = fs.readdirSync(currentDir);
  files.forEach(file => {
    const filePath = path.join(currentDir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results.push(...listFilesRecursively(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

export function listMarkdownFilesRecursive(dir: string): string[] {
  return listFilesRecursively(dir).map(file => path.relative(dir, file)).filter(file => file.endsWith('.md'));
}

export function listMarkdownFiles(dir: string) {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.md'));
}

export function readFromFile(filename: string) {
  const filePath = path.join(filename);
  const markdown = fs.readFileSync(filePath, 'utf8');
  return markdown;
}
