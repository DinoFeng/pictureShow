import { LocalStorage, SessionStorage, dom } from 'quasar'
import _ from 'lodash'
const tools = {
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
