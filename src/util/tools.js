import { LocalStorage, SessionStorage, dom } from 'quasar'
import _ from 'lodash'
const tools = {
  convertFolderTree(orgData, folderId, path) {
    const dirInfo = _.get(orgData, [folderId, path])
    console.debug('convertFolderTree', dirInfo)
    if (_.isArray(dirInfo)) {
      return dirInfo
        .filter(v => v.type === 'Directory')
        .map(v => ({
          label: v.name,
          icon: 'folder',
          expandedIcon: 'folder_open',
          lazy: true,
          level: v.level,
          fullName: `${v.level}/${v.name}`,
          // handler: node => this.$emit('nodeClick', node),
          children: this.convertFolderTree(orgData, folderId, `${v.level}/${v.name}`),
        }))
    } else {
      return []
    }
  },
  // saveServerConfigToLocal(config) {
  //   LocalStorage.set('servers', JSON.stringify(config))
  // },
  // getServerList() {
  //   const servers = LocalStorage.getItem('servers')
  //   if (servers) {
  //     return JSON.parse(servers)
  //   } else {
  //     return []
  //   }
  // },
  // saveAssignId(id) {
  //   SessionStorage.set('assignId', id)
  // },
  // getAssignId() {
  //   return SessionStorage.getItem('assignId')
  // },

  getPaddingValue(ele) {
    const { style } = dom
    const top = _.toNumber(_.trimEnd(style(ele, 'padding-top'), 'px'))
    const bottom = _.toNumber(_.trimEnd(style(ele, 'padding-bottom'), 'px'))
    const left = _.toNumber(_.trimEnd(style(ele, 'padding-left'), 'px'))
    const right = _.toNumber(_.trimEnd(style(ele, 'padding-right'), 'px'))
    return { top, bottom, left, right }
  },
  getEleSizeValue(ele) {
    const { height, width } = dom
    const h = height(ele)
    const w = width(ele)
    return { height: h, width: w }
  },
}
export default tools
