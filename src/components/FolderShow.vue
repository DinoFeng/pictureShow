<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-tree(:nodes='folders' node-key='label')
</template>

<script>
export default {
  name: 'FolderShow',
  props: {
    folders: Array,
  },
}
</script>
