const fs = require('fs')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const tools = require('../util/tools')

const children = fs
  .readdirSync(path.resolve(__dirname))
  .filter(item => _.endsWith(item, '.js'))
  .map(item => tools.trimEndStr(item, '.js'))
  .filter(item => !['index'].includes(item))
  .reduce((pre, filename) => {
    return _.merge(pre, { [`${_.upperFirst(filename)}`]: require(path.resolve(__dirname, filename)) })
  }, {})

const router = express()

Object.keys(children).forEach(k => {
  router.use(`/${k}`, children[k])
})

module.exports = router
// export default router
