<!--<template lang="pug">
</template>
-->
<script>
import _ from 'lodash'
import { QTable } from 'quasar'
export default {
  extends: QTable,
  props: {
    tableHeight: Number,
    heightUnit: String,
  },
  mixins: [],
  data: () => ({}),
  mounted() {
    // this.$el.ownerDocument.documentElement.style.setProperty(
    //   '--tableHeight',
    //   `${this.calcHeight(this.tableHeight)}${this.heightUnit || 'px'}`,
    // )
    const tableBody = this.$el.getElementsByClassName('q-table__middle')
    // console.debug('stickyHeaderTable mounted', this)
    if (tableBody.length > 0) {
      tableBody[0].style.height = 0
      setTimeout(() => {
        tableBody[0].setAttribute('style', `height:${this.calcHeight(this.tableHeight)}${this.heightUnit || 'px'}`)
        const tableTop = this.$el.getElementsByClassName('q-table__top')
        if (tableTop.length > 0) {
          // console.debug('stickyHeaderTable mounted', tableTop)
          // tableBody[0].setAttribute('style', `height:null`)
          tableTop[0].style.height = null
        }
      }, 10)
      // console.debug('stickyHeaderTable mounted cc[0]', cc[0])
      // let newClass = cc.className.split(' ')
      // newClass.push(this.className)
      // cc.className = newClass.join(' ') // .className += 'AAAAAAAAA'
      // // document.documentElement.style.setProperty('--styleName', 'AAAAAAAAA')
      // let style = this.$el.ownerDocument.createElement('style')
      // style.type = 'text/css'
      // style.appendChild(this.$el.ownerDocument.createTextNode(this.classStyle))
      // cc.appendChild(style)
    }
    // if (tableTop > 0) {
    //   // tableBody[0].setAttribute('style', `height:null`)
    //   tableTop[0].style.height = null
    // }
  },
  methods: {
    calcHeight(val) {
      const bottomHeight = 50
      if (this.hideBottom) {
        return val
      } else {
        return val - bottomHeight
      }
    },
    getTrElement(node) {
      if (node) {
        const nodeName = _.get(node, 'nodeName')
        switch (nodeName) {
          case 'TR':
            return node
          case 'TBODY':
            return null
          default:
            return this.getTrElement(node.parentNode)
        }
      }
    },
  },
  watch: {
    tableHeight: {
      handler: function(val, oldVal) {
        if (val != oldVal) {
          if (this.$el) {
            // document.documentElement.style.setProperty(
            //   '--tableHeight',
            //   `${this.calcHeight(val)}${this.heightUnit || 'px'}`,
            // )
            // this.$el.ownerDocument.documentElement.style.setProperty(
            //   '--tableHeight',
            //   `${this.calcHeight(val)}${this.heightUnit || 'px'}`,
            // )
            const tableBody = this.$el.getElementsByClassName('q-table__middle')

            if (tableBody.length > 0) {
              tableBody[0].style.height = null
              setTimeout(() => {
                tableBody[0].setAttribute('style', `height:${this.calcHeight(val)}${this.heightUnit || 'px'}`)
                const tableTop = this.$el.getElementsByClassName('q-table__top')
                // console.debug('stickyHeaderTable watch1', tableTop)
                if (tableTop.length > 0) {
                  // console.debug('stickyHeaderTable watch2', tableTop)
                  tableTop[0].style.height = null
                }
              }, 10)
              // console.debug('stickyHeaderTable mounted cc[0]', cc[0])
            }
          }
        }
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
thead tr:first-child th {
  position: sticky;
  top: 0;
  opacity: 1;
  z-index: 1;
}
</style>
