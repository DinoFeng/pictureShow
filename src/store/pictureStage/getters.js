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
        level: '/',
        isRoot: true,
        children: tools.convertFolderTree(state.dirInfo, state.curFolderId, '/'),
      },
    ] // state.dirInfo[state.curFolderId]
    console.debug('folderTree', res, state.dirInfo)
    return res
  },
  fileList(state) {
    const dirInfo = _.get(state.dirInfo, [state.curFolderId, state.curPath])
    if (_.isArray(dirInfo)) {
      return dirInfo
        .filter(v => v.type === 'File')
        .map(p =>
          _.merge(p, {
            key: `${p.folderId}/${p.level}/${p.name}`,
            url: `/api/${p.folderId}/readFile?path=${encodeURIComponent(`${p.level}/${p.name}`)}`,
          }),
        )
    } else {
      return []
    }
  },
  imageList(state) {
    const dirInfo = _.get(state.dirInfo, [state.curFolderId, state.curPath])
    if (_.isArray(dirInfo)) {
      return dirInfo
        .filter(v => v.type === 'File')
        .filter(v =>
          [
            '.jpg',
            '.jpeg',
            '.jpe',
            '.jif',
            '.jfif',
            '.jfi',
            '.png',
            '.gif',
            '.webp',
            // '.tiff',
            // '.tif',
            '.psd',
            '.raw',
            '.arw',
            '.cr2',
            '.nrw',
            '.k25',
            '.bmp',
            '.dib',
            '.heif',
            '.heic',
            '.ind',
            '.indd',
            '.indt',
            '.jp2',
            '.j2k',
            '.jpf',
            '.jpx',
            '.jpm',
            '.mj2',
            '.svg',
            '.svgz',
            '.ai',
            '.eps',
            // '.pdf',
          ].includes(v.ext.toLowerCase()),
        )
        .map(p =>
          _.merge(p, {
            key: `${p.folderId}/${p.level}/${p.name}`,
            url: `/api/${p.folderId}/readFile?path=${encodeURIComponent(`${p.level}/${p.name}`)}`,
          }),
        )
    } else {
      return []
    }
  },
}
export default getters
