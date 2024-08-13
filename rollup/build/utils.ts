import { globSync } from 'glob';
import { fileURLToPath } from 'url';
import {
  dirname,
  resolve,
  relative,
  extname
} from 'path';

export function getRootPath () {
  return fileURLToPath(new URL(import.meta.url));
}

export function getRootFolder () {
  return dirname(getRootPath());
}

export function resolvePath (...paths: string[]) {
  return resolve(getRootFolder(), ...paths);
}

export const rootDir = resolvePath('..');

export function getEntryInputs (path: string, otherEntryInputs: Record<string, string> = {}) {
  const inputs = Object.fromEntries(
    globSync(path).map((file: string) => [
      relative(
        'src',
        file.slice(0, file.length - extname(file).length)
      ),
      resolve(rootDir, file)
    ]),
  );
  Object.assign(inputs, otherEntryInputs);
  return inputs;
}
