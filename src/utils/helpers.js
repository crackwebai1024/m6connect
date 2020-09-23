import { isObject } from 'lodash'

function dataGet(source, path = '', dfl = null) {
  return path
    .split('.')
    .reduce(
      (previous, current) =>
        isObject(previous) ? previous[current] : previous,
      source
    ) || dfl
}

const install = Vue => {
  Vue.prototype.$h = {
    dg: dataGet
  }
}

export { dataGet }

export default install
