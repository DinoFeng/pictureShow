import _ from 'lodash'
const getters = {
  appLoading(state) {
    return state.loading > 0
  },
  getDurationMs(state) {
    return state.durationMs
  },
}
export default getters
