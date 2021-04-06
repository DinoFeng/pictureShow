<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-tree(
      :nodes='folders' 
      node-key='fullName'
      @lazy-load="onLazyLoad"
      )
</template>

<script>
export default {
  name: 'FolderShow',
  props: {
    folders: Array,
  },
  methods: {
    onLazyLoad({ node, key, done, fail }) {
      this.$emit('lazy-load', { node, key, done, fail })
    },
  },
}
</script>
