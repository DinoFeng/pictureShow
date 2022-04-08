import API from './api'
import _ from 'lodash'
const actions = {
  // async readDir({ folderId, path }, context) {
  //   const api = new API(`api/{folderId}/readDir`, {
  //     pathParams: { folderId },
  //     params: { path },
  //   })
  //   const data = await api.fetch(false)
  //   if (context) {
  //     _.merge(context, { durationMs: api.durationMs })
  //   }
  //   console.debug(`readDir durationMs:${api.durationMs} result is:`, data)
  //   return data
  // },
  async getDirs({ path }, context) {
    const api = new API(`api/fs/getDirs/{path}`, { pathParams: { path } })
    const data = await api.fetch(false)
    if (context) {
      _.merge(context, { durationMs: api.durationMs })
    }
    console.debug(`getDirs durationMs:${api.durationMs} result is:`, data)
    return data
  },
  async getDrivers(context) {
    const api = new API(`api/fs/getDrivers`, {})
    const data = await api.fetch(false)
    if (context) {
      _.merge(context, { durationMs: api.durationMs })
    }
    console.debug(`getDrivers durationMs:${api.durationMs} result is:`, data)
    return data
  },
}

export default actions
