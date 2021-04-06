const _ = require('lodash')
const mutations = {
  setDirData(state, { folderId, path, results }) {
    // console.debug({ folderId, path, results, state: JSON.stringify(state) })
    state.curFolderId = folderId
    if (path) {
      state.curPath = path
    } else {
      // is root
      state.curPath = '/'
    }
    // console.debug({ folderId, path, results, state: JSON.stringify(state) })
    state.dirInfo = _.merge({}, state.dirInfo, { [folderId]: { [state.curPath]: results } })
    // console.debug({ folderId, path, results, state: JSON.stringify(state) })
  },
}
export default mutations
