import gobalAction from '../../util/gobalAction'
const actions = {
  async readDir({ commit, dispatch }, { folderId, path }) {
    try {
      commit('app/setLoading', 1, { root: true })
      const context = {}
      const results = await gobalAction.readDir({ folderId, path }, context)
      dispatch('saveReadDirResults', { folderId, path, results })
      dispatch('app/logDurationMs', context.durationMs, { root: true })
      return results
    } catch (error) {
      dispatch('errorHandle/doPushError', { error }, { root: true })
      throw error
    } finally {
      commit('app/setLoading', -1, { root: true })
    }
  },

  async getDirs({ commit, dispatch }, path) {
    try {
      commit('app/setLoading', 1, { root: true })
      const context = {}
      const result = await gobalAction.getDirs({ path }, context)
      dispatch('doSetDirs', { path, result })
      dispatch('app/logDurationMs', context.durationMs, { root: true })
      return result
    } catch (error) {
      dispatch('errorHandle/doPushError', { error }, { root: true })
      throw error
    } finally {
      commit('app/setLoading', -1, { root: true })
    }
  },

  async getDrivers({ commit, dispatch }) {
    try {
      commit('app/setLoading', 1, { root: true })
      const context = {}
      const result = await gobalAction.getDrivers(context)
      dispatch('doSetDrivers', result)
      dispatch('app/logDurationMs', context.durationMs, { root: true })
      return result
    } catch (error) {
      dispatch('errorHandle/doPushError', { error }, { root: true })
      throw error
    } finally {
      commit('app/setLoading', -1, { root: true })
    }
  },
}
export default actions
