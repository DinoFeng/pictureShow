<template lang="pug">
  .q-pa-md.q-gutter-sm
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
    }
  },
  methods: {
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
    // addClickHandler(nodes) {
    //   return nodes.map(node =>
    //     _.merge(node, {
    //       handler: n => this.onNodeClick(n),
    //       children: this.addClickHandler(node.children),
    //     }),
    //   )
    // },
  },
}
</script>

<style scoped>
.canClick {
  cursor: pointer;
}
/* span {
  color: brown;
} */
</style>
