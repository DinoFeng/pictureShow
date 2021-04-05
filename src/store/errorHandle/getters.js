import _ from 'lodash'
const getters = {
  err(state) {
    return _.get(state, ['errors', 0])
  },
  errList(state) {
    return _.get(state, ['errors'])
  },
}
export default getters
