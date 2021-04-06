import _ from 'lodash'
import tools from '../../util/tools'
const getters = {
  folderTree(state) {
    // return getFolderTree(state, state.curFolderId, '/')
    return [
      {
        label: state.curFolderId,
        icon: 'folder',
        fullName: state.curFolderId,
        children: tools.convertFolderTree(state.dirInfo, state.curFolderId, '/'),
      },
    ] // state.dirInfo[state.curFolderId]
  },
  // fileList(state) {
  //   return state.dirInfo.filter(v => v.type === 'File')
  // },
}
export default getters
