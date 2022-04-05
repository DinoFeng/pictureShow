const express = require('express')
const _ = require('lodash')
const FileInfoProvider = require('../bll/fileInfoProvider')
const router = express.Router()
const { wrapAsync } = require('./common')

router.get(
  '/getDrivers',
  wrapAsync(async req => {
    return FileInfoProvider.getDrivers()
  }),
)

router.get(
  '/getDirs/*',
  wrapAsync(async req => {
    // const { folder } = req.params
    let dir = Object.values(req.params)[0]
    if (_.endsWith(dir, ':')) {
      dir = `${dir}\\`
    }
    console.debug(dir, req.params, req.path)
    return FileInfoProvider.getDirs(dir)
  }),
)

router.get('/images/*', async (req, res) => {
  // const { folder } = req.params
  const fullPath = Object.values(req.params)[0]
  console.debug(fullPath, req.params, req.path)
  res.download(FileInfoProvider.readFile(fullPath))
})
// router.get(
//   '/getFiles/*',
//   wrapAsync(async req => {
//     const { folder } = req.params
//     let dir = Object.values(req.params)[0]
//     if (_.endsWith(dir, ':')) {
//       dir = `${dir}\\`
//     }
//     console.debug(folder, req.params, req.path)
//     return FileInfoProvider.getFiles(dir)
//   }),
// )

// router.get(
//   '/:folderId/readDir',
//   wrapAsync(async req => {
//     const { folderId } = req.params
//     const { path } = req.query
//     return FileInfoProvider.readDir(folderId, path || '/')
//     // encodeURIComponent
//   }),
// )

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
// router.get('/test', async req => {
//   req.query
// })

module.exports = router
