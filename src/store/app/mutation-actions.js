const actions = {
  logDurationMs: {
    // root: true,
    handler({ commit }, durationMs) {
      // console.debug(err)
      commit('setDurationMs', durationMs)
    },
  },
}
export default actions
