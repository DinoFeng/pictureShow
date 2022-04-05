const actions = {
  saveReadDirResults: {
    handler({ commit }, { folderId, path, results }) {
      commit('setDirData', { folderId, path, results })
    },
  },
  doSetDirs: {
    handler({ commit }, { path, result }) {
      commit('setDirs', { path, result })
    },
  },
  doSetDrivers: {
    handler({ commit }, result) {
      commit('setDrivers', result)
    },
  },
}
export default actions
