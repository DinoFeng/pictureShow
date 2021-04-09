import _ from 'lodash'
import tools from '../../util/tools'
const getters = {
  folderTree(state) {
    // return getFolderTree(state, state.curFolderId, '/')
    const res = [
      {
        label: state.curFolderId,
        icon: 'folder',
        fullName: state.curFolderId,
        children: tools.convertFolderTree(state.dirInfo, state.curFolderId, '/'),
      },
    ] // state.dirInfo[state.curFolderId]
    console.debug('folderTree', res, state.dirInfo)
    return res
  },
  // fileList(state) {
  //   return state.dirInfo.filter(v => v.type === 'File')
  // },
}
export default getters
