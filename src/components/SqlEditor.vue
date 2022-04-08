<template lang="pug">
  .q-pa-md.q-gutter-sm
    ace-editor(
      v-model='editing'
      :maxLines='28'
      :minLines='18'
      mode='sql'
      theme="tomorrow"
      )

</template>

<script>
import _ from 'lodash'
import aceEditor from './ace-editor'
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
  methods: {},
  watch: {},
}
</script>

<style scoped></style>
