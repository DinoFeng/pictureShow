<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      folder-show(
        :folders='folderTree' 
        @lazy-load='onLazyLoad'
        @node-click='onNodeClick'
        @rootFolderChange='onFolderChange'
        )
    template(v-slot:after)
      picture-show(
        :pictures='imageList'
        )

  //- img(
  //-   alt='Quasar logo' 
  //-   src='~assets/quasar-logo-full.svg'
  //-   )
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
    this.readConfig()
  },
  data: () => {
    return {
      splitterModel: 25,
    }
  },
  computed: {
    ...mapState('pictureStage', ['curFolderId', 'foldersId']),
    ...mapGetters('pictureStage', ['folderTree', 'imageList']),
  },
  methods: {
    ...mapActions('pictureStage', ['readDir', 'readConfig']),
    ...mapMutations('pictureStage', ['selectPath', 'selectFolder']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    onFolderChange(folderId) {
      console.debug('onFolderChange', folderId)
      this.readDir({ folderId }).then(() => this.selectFolder(folderId))
    },
    onNodeClick(node) {
      console.debug('onLazyLoad', node)
      this.readDir({
        folderId: this.curFolderId,
        path: node.isRoot ? '/' : node.fullName,
      }).then(() => this.selectPath(node.fullName))
    },
    onLazyLoad({ node, key, done, fail }) {
      console.debug('onLazyLoad', node)
      this.readDir({
        folderId: this.curFolderId,
        path: node.fullName,
      }).then(() => done())
      // .then(() => (node.lazy = true))

      // done()
      // call fail() if any error occurs
      // this.readDir({ folderId: 'c' })

      // setTimeout(() => {
      //   // simulate loading and setting an empty node
      //   if (key.indexOf('Lazy load empty') > -1) {
      //     done([])
      //     return
      //   }

      //   const label = node.label
      //   done([
      //     { label: `${label}.1` },
      //     { label: `${label}.2`, lazy: true },
      //     {
      //       label: `${label}.3`,
      //       children: [
      //         { label: `${label}.3.1`, lazy: true },
      //         { label: `${label}.3.2`, lazy: true },
      //       ],
      //     },
      //   ])
      // }, 1000)
    },
  },
  watch: {
    // dirInfo: {
    //   handler: function(val) {
    //     console.debug('watch dirInfo', val)
    //   },
    // },
    // curFolderId: {
    //   handler: function(val) {
    //     console.debug('watch curFolderId', val)
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
