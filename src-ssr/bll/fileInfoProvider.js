const fs = require('fs')
const path = require('path')
const { logger } = require('../util/logger')

const readConfig = () => {
  const p = process.env.DEBUGGING ? 'public\\config\\config.json' : 'www\\config\\config.json'
  // logger.debug('readConfig', p, path.resolve(p))
  const rawdata = fs.readFileSync(path.resolve(p))
  return JSON.parse(rawdata)
}

class FileInfoProvider {
  static readDir(folderId, level) {
    const config = readConfig()
    const p = config[folderId]
    if (p) {
      const dir = path.join(p, level)
      // logger.debug('readDir', { folderId, level, dir })
      if (fs.existsSync(dir)) {
        const names = fs.readdirSync(dir)
        return names.map(name => {
          const fullPath = path.join(dir, name)
          // logger.debug('readDir', { fullPath })
          const stats = fs.statSync(fullPath)
          return {
            type:
              (stats.isDirectory() && 'Directory') ||
              (stats.isFile() && 'File') ||
              (stats.isBlockDevice() && 'BlockDevice') ||
              (stats.isCharacterDevice() && 'CharacterDevice') ||
              (stats.isFIFO() && 'FIFO') ||
              (stats.isSocket() && 'Socket') ||
              (stats.isSymbolicLink() && 'SymbolicLink'),
            name,
            fullPath,
            ext: path.extname(fullPath),
          }
        })
      } else {
        throw new Error(`dir:'${dir}' not exists!`)
      }
    } else {
      throw new Error(`config not exists key:${folderId}`)
    }
  }
}

module.exports = FileInfoProvider
