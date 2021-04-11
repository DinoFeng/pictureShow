import _ from 'lodash'
import tools from '../../util/tools'
const getters = {
  folderTree(state) {
    // return getFolderTree(state, state.curFolderId, '/')
    const res = [
      {
        label: state.curFolderId,
        icon: 'folder',
        expandedIcon: 'folder_open',
        fullName: state.curFolderId,
        children: tools.convertFolderTree(state.dirInfo, state.curFolderId, '/'),
      },
    ] // state.dirInfo[state.curFolderId]
    console.debug('folderTree', res, state.dirInfo)
    return res
  },
  fileList(state) {
    const dirInfo = _.get(state.dirInfo, [state.curFolderId, state.curPath])
    if (_.isArray(dirInfo)) {
      return dirInfo.filter(v => v.type === 'File')
    } else {
      return []
    }
  },
}
export default getters
