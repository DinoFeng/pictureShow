<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      folder-show(:folders='folderTree')
      //- .q-pa-md
      //-   .text-h4.q-mb-md Before
      //-   .q-my-md(v-for='n in 4' :key='n')
      //-     | {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.
    template(v-slot:after)
      .q-pa-md
        .text-h4.q-mb-md After
        .q-my-md(v-for='n in 2', :key='n')
          | {{ n }}.[ {{curFolderId}} ]Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.

  //- img(
  //-   alt='Quasar logo' 
  //-   src='~assets/quasar-logo-full.svg'
  //-   )
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import FolderShow from '../components/FolderShow'
import tools from '../util/tools'
export default {
  name: 'PictureStage',
  components: {
    FolderShow,
  },
  updated() {
    console.debug({
      dirInfo: this.dirInfo,
      curFolderId: this.curFolderId,
      curPath: this.curPath,
      folderTree: this.folderTree,
    })
    // this.loadDirInfo().then(() => {
    //   console.debug({
    //     dirInfo: this.dirInfo,
    //     curFolderId: this.curFolderId,
    //     curPath: this.curPath,
    //     folderTree: this.folderTree,
    //   })
    // })
  },
  data: () => {
    return {
      splitterModel: 50,
      // folderTree: [],
      simple: [
        {
          label: 'Satisfied customers (with avatar)',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              label: 'Good food (with icon)',
              icon: 'restaurant_menu',
              children: [{ label: 'Quality ingredients' }, { label: 'Good recipe' }],
            },
            {
              label: 'Good service (disabled node with icon)',
              icon: 'room_service',
              disabled: true,
              children: [{ label: 'Prompt attention' }, { label: 'Professional waiter' }],
            },
            {
              label: 'Pleasant surroundings (with icon)',
              icon: 'photo',
              children: [
                {
                  label: 'Happy atmosphere (with image)',
                  img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
                },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' },
              ],
            },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapState('pictureStage', ['dirInfo', 'curFolderId', 'curPath']),
    folderTree() {
      return [
        {
          label: this.curFolderId,
          icon: 'folder',
          fullName: this.curFolderId,
          children: tools.convertFolderTree(this.dirInfo, this.curFolderId, '/'),
        },
      ] // state.dirInfo[state.curFolderId]
    },
  },
  methods: {
    ...mapActions('pictureStage', ['readDir']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    async loadDirInfo() {
      console.debug({
        dirInfo: this.dirInfo,
        curFolderId: this.curFolderId,
        curPath: this.curPath,
        folderTree: this.folderTree,
      })
      return this.readDir({ folderId: 'd' })
    },
    // tableClick(database, table) {
    //   // console.debug('tableClick', table)
    //   const { server } = _.get(this.$route, ['params'])
    //   this.findTableData({ page: 1, serverName: server, database, table, isReset: true }).then(() =>
    //     this.$router.push({ name: 'table', params: { server, db: database, table } }),
    //   )
    // },
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
