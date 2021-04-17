const actions = {
  saveReadDirResults: {
    handler({ commit }, { folderId, path, results }) {
      commit('setDirData', { folderId, path, results })
    },
  },
  saveReadConfigResults: {
    handler({ commit }, results) {
      commit('setFoldersId', results)
    },
  },
}
export default actions
