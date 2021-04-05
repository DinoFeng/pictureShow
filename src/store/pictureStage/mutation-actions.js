const actions = {
  saveReadDirResults: {
    handler({ commit }, { folderId, path, results }) {
      commit('setDirData', { folderId, path, results })
    },
  },
}
export default actions
