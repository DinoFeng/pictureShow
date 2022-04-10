<template lang="pug">
  .q-pa-md.q-gutter-sm
    sticky-header-table(
      style="height: 400px"
      :data='rows',
      :columns='columns'
      :table-header-style='{ backgroundColor: "#eee" }',
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      @request="onRequest"
      binary-state-sort
    )

</template>

<script>
import _ from 'lodash'
import stickyHeaderTable from './stickyHeaderTable'
export default {
  name: 'TableShow',
  components: { stickyHeaderTable },
  props: {
    rows: Array,
    total: Number,
    pageSize: Number,
    loading: Boolean,
  },
  data() {
    return {
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: this.pageSize,
        rowsNumber: 10,
      },
    }
  },
  computed: {
    columns() {
      const row = _.get(this.rows, [0]) || {}
      const cols = Object.keys(row).map(name => ({
        name,
        label: name, //_.startCase(name),
        align: 'left',
        field: name,
        // field: row => {
        //   if (!_.isUndefined(row[name])) {
        //     // return row[name].display()
        //   } else {
        //     return undefined
        //   }
        // },
      }))
      console.debug(cols)
      return cols
    },
  },
  methods: {
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      this.$emit('changedPage', { page, pageSize: rowsPerPage })

      // // update rowsCount with appropriate value
      // this.pagination.rowsNumber = this.getRowsNumberCount(filter)

      // // get all rows if "All" (0) is selected
      // const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

      // // calculate starting row of data
      // const startRow = (page - 1) * rowsPerPage

      // // fetch data from "server"
      // const returnedData = this.fetchFromServerFun()

      // // clear out existing data and add new
      // this.data.splice(0, this.data.length, ...returnedData)

      // don't forget to update local pagination object
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      this.$emit('update:pageSize', rowsPerPage)
      // // ...and turn of loading indicator
    },
    // onScroll({ to, ref }) {
    //   const lastIndex = this.data.length - 1

    //   if (this.loading !== true && this.nextPage < lastPage && to === lastIndex) {
    //     this.loading = true

    //     setTimeout(() => {
    //       this.nextPage++
    //       this.$nextTick(() => {
    //         ref.refresh()
    //         this.loading = false
    //       })
    //     }, 500)
    //   }
    // },
  },
  watch: {
    total: {
      handler(v) {
        console.debug({ v })
        this.pagination = _.merge({}, this.pagination, { rowsNumber: Math.ceil(v / this.pagination.rowsPerPage) })
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
