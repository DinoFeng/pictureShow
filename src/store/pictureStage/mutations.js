const _ = require('lodash')
const mutations = {
  // setDirData(state, { folderId, path, results }) {
  //   console.debug({ folderId, path, results })
  //   state.currentDriver = folderId
  //   // if (path) {
  //   //   state.curPath = `${path}`
  //   // } else {
  //   //   // is root
  //   //   state.curPath = '/'
  //   // }
  //   // const curPath = path || '/'
  //   // console.debug({ folderId, path, results, state: JSON.stringify(state) })
  //   state.dirInfo = _.merge({}, state.dirInfo, { [folderId]: { [path || '/']: results } })
  //   // console.debug({ folderId, path, results, state: JSON.stringify(state) })
  // },
  // selectPath(state, path) {
  //   state.curPath = path
  // },
  setDrivers(state, drivers) {
    state.drivers = drivers
  },
  // selectFolder(state, folderId) {
  //   state.currentDriver = folderId
  // },
  setDirs(state, { path, result }) {
    console.debug({ path, result })
    state.dirInfo = _.merge({}, state.dirInfo, { [path]: result })
  },
  setExcuteResult(state, result) {
    state.excuteResult = result
  },
}
export default mutations
