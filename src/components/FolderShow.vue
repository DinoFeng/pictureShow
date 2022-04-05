<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-select(
      dense 
      outlined 
      label='Driver Choice'
      v-model='selectedDriver' 
      :options='drivers' 
      )
    q-tree(
      node-key='fullName'
      selected-color='primary'
      :nodes='folders' 
      :selected.sync="selectedFolder"
      :expanded.sync="expandedNodes"
      @lazy-load="onLazyLoad"
      )
      template(v-slot:default-header='prop')
        .canClick.spanStyle(@click='onNodeClick(prop.node)')
          q-icon.q-mr-sm(:name="isExpanded(prop.node)?prop.node.expandedIcon:prop.node.icon")
          span.spanStyle {{ prop.node.label }}

</template>

<script>
import _ from 'lodash'
export default {
  name: 'FolderShow',
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
    folders() {
      return [
        {
          label: this.selectedDriver,
          icon: 'folder',
          expandedIcon: 'folder_open',
          fullName: this.selectedDriver,
          isRoot: true,
          children: this.getChildren(this.selectedDriver),
        },
      ]
    },
    imageExts() {
      const defaultExts = [
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
      ]
      return defaultExts
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
