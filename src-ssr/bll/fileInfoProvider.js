const fs = require('fs')
const path = require('path')
const { logger } = require('../util/logger')
const tools = require('../util/tools')

const readConfig = () => {
  const p = process.env.DEBUGGING ? 'public\\config\\config.json' : 'www\\config\\config.json'
  // logger.debug('readConfig', p, path.resolve(p))
  const rawdata = fs.readFileSync(path.resolve(p))
  return JSON.parse(rawdata)
}

class FileInfoProvider {
  static getDrivers() {
    const drivers = tools
      .genArray(26, i => {
        return String.fromCharCode('A'.charCodeAt() + i)
      })
      .map(c => {
        const dir = `${c}:/`
        if (fs.existsSync(dir)) {
          return dir
        }
      })
      .filter(v => v)
    return drivers
  }

  static getDirs(dir) {
    // console.debug(dir)
    if (fs.existsSync(dir)) {
      const names = fs.readdirSync(dir)
      return names
        .map(name => {
          const fullPath = path.join(dir, name)
          // logger.debug('getDirs', { fullPath })
          try {
            const stats = fs.statSync(fullPath)
            return {
              fullPath,
              type:
                (stats.isDirectory() && 'Directory') ||
                (stats.isFile() && 'File') ||
                (stats.isBlockDevice() && 'BlockDevice') ||
                (stats.isCharacterDevice() && 'CharacterDevice') ||
                (stats.isFIFO() && 'FIFO') ||
                (stats.isSocket() && 'Socket') ||
                (stats.isSymbolicLink() && 'SymbolicLink'),
              dir,
              name,
              // folderId,
              // level,
              ext: path.extname(fullPath),
            }
          } catch (e) {
            logger.error(e)
          }
        })
        .filter(v => v)
    }
  }

  // static readDir(folderId, level) {
  //   const config = readConfig()
  //   const p = config[folderId]
  //   if (p) {
  //     const dir = path.join(p, level)
  //     logger.debug('readDir', { folderId, level, dir })
  //     if (fs.existsSync(dir)) {
  //       const names = fs.readdirSync(dir)
  //       return names
  //         .map(name => {
  //           const fullPath = path.join(dir, name)
  //           logger.debug('readDir', { fullPath })
  //           try {
  //             const stats = fs.statSync(fullPath)
  //             return {
  //               type:
  //                 (stats.isDirectory() && 'Directory') ||
  //                 (stats.isFile() && 'File') ||
  //                 (stats.isBlockDevice() && 'BlockDevice') ||
  //                 (stats.isCharacterDevice() && 'CharacterDevice') ||
  //                 (stats.isFIFO() && 'FIFO') ||
  //                 (stats.isSocket() && 'Socket') ||
  //                 (stats.isSymbolicLink() && 'SymbolicLink'),
  //               name,
  //               folderId,
  //               level,
  //               ext: path.extname(fullPath),
  //             }
  //           } catch (e) {
  //             logger.error(e)
  //           }
  //         })
  //         .filter(v => v)
  //     } else {
  //       throw new Error(`dir:'${dir}' not exists!`)
  //     }
  //   } else {
  //     throw new Error(`config not exists key:${folderId}`)
  //   }
  // }

  static readFile(fullPath) {
    // const config = readConfig()
    // const p = config[folderId]
    // if (p) {
    // const dir = path.join(p, file)
    // logger.debug('readFile', { folderId, file, dir })
    if (fs.existsSync(fullPath)) {
      // return fs.readFileSync(fullPath)
      return fullPath
    }
    // }
  }

  // static readFile(folderId, file) {
  //   const config = readConfig()
  //   const p = config[folderId]
  //   if (p) {
  //     const dir = path.join(p, file)
  //     logger.debug('readFile', { folderId, file, dir })
  //     if (fs.existsSync(dir)) {
  //       // return fs.readFileSync(dir)
  //       return dir
  //     }
  //   }
  // }

  static getConfigs() {
    const config = readConfig()
    return Object.keys(config)
  }
}

module.exports = FileInfoProvider
