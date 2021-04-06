<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-tree(:nodes='folders' node-key='fullName')
</template>

<script>
export default {
  name: 'FolderShow',
  props: {
    folders: Array,
  },
}
</script>
