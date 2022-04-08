const express = require('express')
const _ = require('lodash')
const FileInfoProvider = require('../bll/fileInfoProvider')
const router = express.Router()
const { wrapAsync } = require('../util/common')

router.get(
  '/getDrivers',
  wrapAsync(async req => {
    return FileInfoProvider.getDrivers()
  }),
)

router.get(
  '/getDirs/*',
  wrapAsync(async req => {
    let dir = Object.values(req.params)[0]
    if (_.endsWith(dir, ':')) {
      dir = `${dir}\\`
    }
    // console.debug(dir, req.params, req.path)
    return FileInfoProvider.getDirs(dir)
  }),
)

router.get('/images/*', async (req, res) => {
  const fullPath = Object.values(req.params)[0]
  // console.debug(fullPath, req.params, req.path)
  res.sendFile(FileInfoProvider.readFile(fullPath))
})

// router.get('/:folderId/readFile', async (req, res, next) => {
//   const { folderId } = req.params
//   const { path } = req.query
//   res.download(FileInfoProvider.readFile(folderId, path))
// })

// router.get(
//   '/config/read',
//   wrapAsync(async (req, res, next) => {
//     return FileInfoProvider.getConfigs()
//   }),
// )

module.exports = router
