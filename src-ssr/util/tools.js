const _ = require('lodash')
const A_MOMENT = 5000
const tools = {
  async genArrayAsync(size, fun) {
    const f = _.isFunction(fun) ? fun : () => null
    return Promise.all(
      'a'
        .repeat(size)
        .split('')
        .map((x, i) => f(i)),
    ) // String.fromCharCode(Math.random() * 94 + 32)
  },

  genArray(size, fun) {
    const f = _.isFunction(fun) ? fun : () => null
    return 'a'
      .repeat(size)
      .split('')
      .map((x, i) => f(i))
  },

  async waitAmoment(t) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, t || A_MOMENT)
    })
  },
}
module.exports = tools
