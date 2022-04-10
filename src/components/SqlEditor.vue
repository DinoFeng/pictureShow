<template lang="pug">
  .q-pa-md.q-gutter-sm
    ace-editor(
      v-model='editing'
      :maxLines='28'
      :minLines='18'
      mode='sql'
      theme="tomorrow"
      @run='onRun'
      )

</template>

<script>
import _ from 'lodash'
import aceEditor from './aceEditor'
export default {
  name: 'SqlEditor',
  components: { aceEditor },
  props: {},
  data() {
    return {
      editing: '',
    }
  },
  computed: {},
  methods: {
    onRun() {
      // console.debug('RUN')
      this.$emit('run', this.editing)
    },
  },
  watch: {
    // editing: {
    //   handler(v) {
    //     console.debug({ v })
    //   },
    //   immediate: true,
    // },
  },
}
</script>

<style scoped></style>
