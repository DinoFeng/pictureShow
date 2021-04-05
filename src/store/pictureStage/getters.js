import _ from 'lodash'
const getters = {
  folderList(state) {
    return state.dirInfo.filter(v => v.type === 'Directory')
  },
  fileList(state) {
    return state.dirInfo.filter(v => v.type === 'File')
  },
}
export default getters
