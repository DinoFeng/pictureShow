<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      folder-show(
        :folders='folderTree' 
        @lazy-load='onLazyLoad'
        @node-click='onNodeClick'
        )
      //- .q-pa-md
      //-   .text-h4.q-mb-md Before
      //-   .q-my-md(v-for='n in 4' :key='n')
      //-     | {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
    template(v-slot:after)
      picture-show(
        :pictures='fileList'
        )
      //- .q-pa-md
      //-   .text-h4.q-mb-md After
      //-   .q-my-md
      //-   | {{showFileList}}
      //-   //- .q-my-md
      //-   //- | {{showDirInfo}}
      //-   //- .q-my-md
      //-   //- | {{showOtherInfo}}
      //-   //- .q-my-md(v-for='n in 2', :key='n')
      //-   //-   | {{ n }}.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.

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
    this.readDir({ folderId: 'f' })
  },
  data: () => {
    return {
      splitterModel: 25,
    }
  },
  computed: {
    ...mapState('pictureStage', ['curFolderId', 'curPath', 'dirInfo']),
    ...mapGetters('pictureStage', ['folderTree', 'fileList']),
    showFileList() {
      return JSON.stringify(this.fileList, null, 2)
    },
    showDirInfo() {
      return JSON.stringify(this.dirInfo, null, 2)
    },
    showOtherInfo() {
      return JSON.stringify({ curPath: this.curPath, curFolderId: this.curFolderId }, null, 2)
    },
  },
  methods: {
    ...mapActions('pictureStage', ['readDir']),
    ...mapMutations('pictureStage', ['selectPath']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    onNodeClick(node) {
      console.debug('onLazyLoad', node)
      this.readDir({
        folderId: this.curFolderId,
        path: node.fullName,
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
    dirInfo: {
      handler: function(val) {
        console.debug('watch dirInfo', val)
      },
    },
    curFolderId: {
      handler: function(val) {
        console.debug('watch curFolderId', val)
      },
    },
    curPath: {
      handler: function(val) {
        console.debug('watch curPath', val)
      },
    },
  },
}
</script>
