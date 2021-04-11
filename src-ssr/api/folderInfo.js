const express = require('express')
const FileInfoProvider = require('../bll/fileInfoProvider')
const router = express.Router()
const { wrapAsync } = require('./common')

router.get(
  '/:folderId/readDir',
  wrapAsync(async req => {
    const { folderId } = req.params
    const { path } = req.query
    return FileInfoProvider.readDir(folderId, path || '/')
    // encodeURIComponent
  }),
)

router.get('/:folderId/readFile', async (req, res, next) => {
  const { folderId } = req.params
  const { path } = req.query
  res.download(FileInfoProvider.readFile(folderId, path))
})
// router.get('/test', async req => {
//   req.query
// })

module.exports = router
