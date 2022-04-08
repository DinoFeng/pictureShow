<template lang="pug">
  .q-pa-md.q-gutter-sm
    sticky-header-table(
      :data='rows',
      :table-header-style='{ backgroundColor: "#eee" }',
      row-key='_id',
      hide-bottom
    )

</template>

<script>
import _ from 'lodash'
import stickyHeaderTable from './stickyHeaderTable'
export default {
  name: 'TableShow',
  components: { stickyHeaderTable },
  props: {
    drivers: Array,
    getFoldersFun: Function,
  },
  data() {
    return {
      selectedFolder: null,
      expandedNodes: [],
      selectedDriver: '',
      dirsData: {},
      filesData: {},
      imagesData: {},
    }
  },
  computed: {
    rows() {
      return []
    },
    columns() {
      return {}
    },
  },
  methods: {
    getChildren(folder) {
      const dirInfo = _.get(this.dirsData, [folder]) || []
      if (_.isArray(dirInfo)) {
        return dirInfo.map(v => ({
          isRoot: false,
          label: v.name,
          icon: 'folder',
          expandedIcon: 'folder_open',
          lazy: true,
          fullName: `${v.fullPath}`,
          children: this.getChildren(v.fullPath),
        }))
      } else {
        return []
      }
    },
    onLazyLoad({ node, key, done, fail }) {
      this.loadFolders(node.fullName).then(() => done())
      // this.$emit('lazy-load', { node, key, done, fail })
    },
    onNodeClick(node) {
      this.$emit('node-click', node)
      this.loadFolders(node.fullName)
    },
    isExpanded(node) {
      return this.expandedNodes.findIndex(v => v === node.fullName) >= 0
    },
    async loadFolders(path) {
      this.getFoldersFun(path).then(result => {
        const dirs = result.filter(v => v.type === 'Directory')
        const files = result.filter(v => v.type === 'File')
        this.dirsData = _.merge({}, this.dirsData, { [path]: dirs })
        this.filesData = _.merge({}, this.dirsData, { [path]: files })
        const imageList = files.filter(v => this.imageExts.includes(v.ext.toLowerCase()))
        this.imagesData = _.merge({}, this.dirsData, { [path]: imageList })
        this.$emit('images-load', imageList)
        this.expandedNodes = Array.from(new Set([...this.expandedNodes, path]))
      })
    },
  },
  watch: {
    selectedDriver: {
      handler(v) {
        if (v) {
          this.$emit('driverChanged', v)
          console.debug('watch selectedDriver', v)
          this.loadFolders(v)
        }
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.canClick {
  cursor: pointer;
}
.spanStyle {
  white-space: nowrap; /*强制span不换行*/
  /* display: inline-block; 将span当做块级元素对待 */
  /* width: 32px; 限制宽度 */
  /* overflow: hidden; 超出宽度部分隐藏 */
  /* text-overflow: ellipsis; 超出部分以点号代替 */
  line-height: 0.9; /*数字与之前的文字对齐*/
}
</style>
