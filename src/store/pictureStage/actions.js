import gobalAction from '../../util/gobalAction'
const actions = {
  async readDir({ commit, dispatch }, { folderId, path }) {
    try {
      commit('app/setLoading', 1)
      const context = {}
      const results = await gobalAction.readDir({ folderId, path }, context)
      dispatch('saveReadDirResults', { folderId, path, results })
      dispatch('app/logDurationMs', context.durationMs, { root: true })
      // commit('app/logDurationMs', 1)
      return dbStats
    } catch (error) {
      dispatch('errorHandle/doPushError', { error }, { root: true })
      throw error
    } finally {
      commit('app/setLoading', -1)
    }
  },
}
export default actions
