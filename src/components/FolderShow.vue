<template lang="pug">
  .q-pa-md.q-gutter-sm
    q-select(
      dense 
      outlined 
      v-model='selectedFolderId' 
      :options='foldersId' 
      label='Folder Choice'
      )
    q-tree(
      ref='folderTree'
      :nodes='folders' 
      :selected.sync="selected"
      node-key='fullName'
      selected-color='primary'
      @lazy-load="onLazyLoad"
      )
      template(v-slot:default-header='prop')
        //- .row.items-center
        .canClick
          q-icon.q-mr-sm(:name="isExpanded(prop.node)?prop.node.expandedIcon:prop.node.icon")
          span(@click='onNodeClick(prop.node)') {{ prop.node.label }}


</template>

<script>
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  name: 'FolderShow',
  props: {
    folders: Array,
  },
  computed: {
    // foldersTree() {
    //   return this.addClickHandler(this.folders)
    // },
  },
  data() {
    return {
      selected: null,
      selectedFolderId: '',
    }
  },
  computed: {
    ...mapState('pictureStage', ['foldersId']),
  },
  methods: {
    ...mapMutations('pictureStage', ['selectFolder']),
    onLazyLoad({ node, key, done, fail }) {
      this.$emit('lazy-load', { node, key, done, fail })
    },
    onNodeClick(node) {
      // console.debug('onNodeClick', node)
      this.$emit('node-click', node)
    },
    isExpanded(node) {
      if (this.$refs.folderTree) {
        return this.$refs.folderTree.isExpanded(node.fullName)
      }
    },
    // onChange() {
    //   this.$emit('rootFolderChange', this.selectedFolderId)
    // },
  },
  watch: {
    selectedFolderId: {
      handler(v) {
        if (v) {
          this.selectFolder(v)
          this.$emit('rootFolderChange', v)
          console.debug('watch selectedFolderId', v)
        }
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.canClick {
  cursor: pointer;
}
</style>
