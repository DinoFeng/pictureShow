<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      folder-show(
        :folders='folderTree'
        @lazy-load='onLazyLoad'
        )
      //- .q-pa-md
      //-   .text-h4.q-mb-md Before
      //-   .q-my-md(v-for='n in 4' :key='n')
      //-     | {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
    template(v-slot:after)
      .q-pa-md
        .text-h4.q-mb-md After
        .q-my-md(v-for='n in 2', :key='n')
          | {{ n }}.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.

  //- img(
  //-   alt='Quasar logo' 
  //-   src='~assets/quasar-logo-full.svg'
  //-   )
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import FolderShow from '../components/FolderShow'
export default {
  name: 'PictureStage',
  components: {
    FolderShow,
  },
  mounted() {
    this.readDir({ folderId: 'c' })
  },
  data: () => {
    return {
      splitterModel: 50,
    }
  },
  computed: {
    // ...mapState('pictureStage', ['dirInfo', 'curFolderId', 'curPath']),
    ...mapGetters('pictureStage', ['folderTree']),
  },
  methods: {
    ...mapActions('pictureStage', ['readDir']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },

    onLazyLoad({ node, key, done, fail }) {
      console.debug('onLazyLoad', node)
      this.readDir({ folderId: 'c', path: node.level ? `${node.level}\\${node.label}` : node.label }).then(() => done())

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
