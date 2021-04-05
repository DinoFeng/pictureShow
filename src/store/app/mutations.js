const mutations = {
  setLoading(state, loading) {
    state.loading = state.loading + loading
  },
  setDurationMs(state, durationMs) {
    state.durationMs = durationMs
  },
}
export default mutations
