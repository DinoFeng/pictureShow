const _ = require('lodash')
const mutations = {
  setDirData(state, { folderId, path, results }) {
    console.debug({ folderId, path, results })
    state.curFolderId = folderId
    // if (path) {
    //   state.curPath = `${path}`
    // } else {
    //   // is root
    //   state.curPath = '/'
    // }
    // const curPath = path || '/'
    // console.debug({ folderId, path, results, state: JSON.stringify(state) })
    state.dirInfo = _.merge({}, state.dirInfo, { [folderId]: { [path || '/']: results } })
    // console.debug({ folderId, path, results, state: JSON.stringify(state) })
  },
  selectPath(state, path) {
    state.curPath = path
  },
  setFoldersId(state, foldersId) {
    state.foldersId = foldersId
  },
  selectFolder(state, folderId) {
    state.curFolderId = folderId
  },
}
export default mutations
