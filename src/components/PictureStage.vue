<template lang="pug">
q-page
  q-splitter(v-model='splitterModel' style='min-height: inherit')
    template(v-slot:before)
      folder-show
      //- .q-pa-md
        .text-h4.q-mb-md
          | Before
        div
          | ref :https://forum.quasar-framework.org/topic/4032/how-to-make-a-q-page-container-child-use-full-height-of-its-grandparent/14

    template(v-slot:after)
      .q-pa-md
        .text-h4.q-mb-md
          | After
        div
</template>

<script>
import FolderShow from './FolderShow.vue'

export default {
  name: 'PictureStage',
  components: { FolderShow },
  props: {
    msg: String,
  },
  data: () => {
    return {
      splitterModel: 50, // start at 50%
    }
  },
  methods: {
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
