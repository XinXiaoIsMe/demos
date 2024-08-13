import { rollup } from 'rollup';
import { rimraf } from 'rimraf';
import vue from 'rollup-plugin-vue';
import ts from 'rollup-plugin-typescript';
import path from 'path';
import { resolvePath, rootDir, getEntryInputs } from './utils.ts';

const tsInputs = getEntryInputs(path.resolve(rootDir, 'src/**/*.ts'), {
  'index': path.resolve(rootDir, 'main.ts'),
});

const vueInputs = getEntryInputs(path.resolve(rootDir, 'src/vue-components/*.vue'));

async function compiler () {
  await clearDist();
  buildFullBundle();
  buildSingleBundle();
  buildVueComponents();
}

async function clearDist () {
  return rimraf(resolvePath('..', 'dist'));
}

async function buildSingleBundle () {
  const bundle = await rollup({
    input: tsInputs,
  });
  
  bundle.write({
    format: 'cjs',
    dir: 'dist/commonjs'
  });
  bundle.write({
    format: 'es',
    dir: 'dist/esm'
  });
}

async function buildFullBundle () {
  const bundle = await rollup({
    input: path.resolve(rootDir, 'main.ts')
  });

  bundle.write({
    format: 'cjs',
    file: 'dist/index.cjs.js'
  });

  bundle.write({
    format: 'es',
    file: 'dist/index.esm.js'
  });
}

async function buildVueComponents () {
  const bundle = await rollup({
    input: vueInputs,
    plugins: [
      ts({
        tsconfig: false
      }),
      vue()
    ],
    external: 'vue'
  });

  bundle.write({
    format: 'es',
    dir: 'dist/vue'
  })
}

compiler();
