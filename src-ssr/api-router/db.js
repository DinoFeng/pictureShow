const express = require('express')
const _ = require('lodash')
const DAO = require('../repository/dao')
const router = express.Router()
const { wrapAsync } = require('../util/common')
const { logger } = require('../util/logger')

router.post(
  '/openDB',
  wrapAsync(async req => {
    return FileInfoProvider.getDrivers()
  }),
)

router.post(
  '/excute',
  wrapAsync(async req => {
    const { sql, page, pageSize } = req.body
    // logger.debug(req)
    const db = await new DAO('C:\\Github\\Dino\\pictureShow\\db\\CheckImagePicLib.db')
    const p = page || 1
    const ps = pageSize || 200

    const totalSQL = `select count(*) as total from (${sql}) A`
    const pageSQL = `select * from (${sql}) A limit ${ps} offset ${(p - 1) * ps}`

    logger.debug({ sql, totalSQL, pageSQL })

    const [rows, total] = await Promise.all([db.all(pageSQL), db.get(totalSQL).then(({ total }) => total)])

    return { rows, total }
  }),
)

module.exports = router
