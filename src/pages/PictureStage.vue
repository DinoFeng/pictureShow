<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      folder-show(
        :drivers='drivers'
        :getFoldersFun='getDirs'
        @images-load='onImagesLoad'
        )
    template(v-slot:after)
      picture-show(
        :pictures='imageList'
        )
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import FolderShow from '../components/FolderShow'
import PictureShow from '../components/pictureShow'
export default {
  name: 'PictureStage',
  components: {
    FolderShow,
    PictureShow,
  },
  mounted() {
    this.getDrivers()
  },
  data: () => {
    return {
      splitterModel: 25,
      images: [],
    }
  },
  computed: {
    // ...mapState('pictureStage', ['drivers']),
    ...mapState('pictureStage', ['drivers']),
    imageList() {
      return this.images.map(p => ({
        key: p.fullPath,
        url: `/api/images/${p.fullPath}`,
      }))
    },
  },
  methods: {
    ...mapActions('pictureStage', ['readDir', 'getDrivers', 'getDirs']),
    ...mapMutations('pictureStage', ['selectPath', 'selectFolder']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    onImagesLoad(imageList) {
      console.debug('onImagesLoad', imageList)
      this.images = imageList
    },
    // onDriverChanged(folderId) {
    //   console.debug('onDriverChanged', folderId)
    //   this.readDir({ folderId }).then(() => this.selectFolder(folderId))
    // },
    // onNodeClick(node) {
    //   console.debug('onLazyLoad', node)
    //   this.readDir({
    //     folderId: this.currentDriver,
    //     path: node.isRoot ? '/' : node.fullName,
    //   }).then(() => this.selectPath(node.fullName))
    // },
    // onLazyLoad({ node, key, done, fail }) {
    //   console.debug('onLazyLoad', node)
    //   this.readDir({
    //     folderId: this.currentDriver,
    //     path: node.fullName,
    //   }).then(() => done())
    //   // .then(() => (node.lazy = true))

    //   // done()
    //   // call fail() if any error occurs
    //   // this.readDir({ folderId: 'c' })

    //   // setTimeout(() => {
    //   //   // simulate loading and setting an empty node
    //   //   if (key.indexOf('Lazy load empty') > -1) {
    //   //     done([])
    //   //     return
    //   //   }

    //   //   const label = node.label
    //   //   done([
    //   //     { label: `${label}.1` },
    //   //     { label: `${label}.2`, lazy: true },
    //   //     {
    //   //       label: `${label}.3`,
    //   //       children: [
    //   //         { label: `${label}.3.1`, lazy: true },
    //   //         { label: `${label}.3.2`, lazy: true },
    //   //       ],
    //   //     },
    //   //   ])
    //   // }, 1000)
    // },
  },
  watch: {
    // dirInfo: {
    //   handler: function(val) {
    //     console.debug('watch dirInfo', val)
    //   },
    // },
    // currentDriver: {
    //   handler: function(val) {
    //     console.debug('watch currentDriver', val)
    //   },
    // },
    // curPath: {
    //   handler: function(val) {
    //     console.debug('watch curPath', val)
    //   },
    // },
  },
}
</script>
