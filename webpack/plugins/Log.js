const { readFileSync, writeFile } = require('fs')
const { resolve } = require('path')

class Log {
  apply (compiler) {
    compiler.hooks.emit.tap(
      'Log',
      compilation => {
        /**
         * {
         *   lastModified: string;
         *   author: string;
         *   filesize: string;
         *   filename: string;
         *   compilerTime: string;
         * }
         */
        const rootPath = resolve(__dirname, '..')
        const {
          author = '佚名',
          name
        } = JSON.parse(readFileSync(resolve(rootPath, 'package.json')).toString())
        const log = {
          lastModified: new Date().toUTCString(),
          projectName: name,
          fileInfo: {},
          author
        }
        const assets = compilation.getAssets()
        assets.forEach(({ name, source }) => {
          log.fileInfo[name] = {
            size: source.size()
          }
        })
        writeFile(rootPath + '/log.json', JSON.stringify(log), function () {})
      }
    )
  }
}

module.exports = Log
