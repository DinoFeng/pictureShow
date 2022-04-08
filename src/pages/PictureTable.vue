<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(horizontal v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      sql-editor(:drivers='drivers', :getFoldersFun='getDirs', @images-load='onImagesLoad')
    template(v-slot:after)
      table-show(:pictures='imageList')
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SqlEditor from '../components/SqlEditor'
import TableShow from '../components/TableShow'
export default {
  name: 'PictureStage',
  components: {
    SqlEditor,
    TableShow,
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
    ...mapState('pictureStage', ['drivers']),
    imageList() {
      return this.images.map(p => ({
        key: p.fullPath,
        url: `/api/images/${p.fullPath}`,
      }))
    },
  },
  methods: {
    ...mapActions('pictureStage', ['getDrivers', 'getDirs']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    onImagesLoad(imageList) {
      console.debug('onImagesLoad', imageList)
      this.images = imageList
    },
  },
}
</script>
