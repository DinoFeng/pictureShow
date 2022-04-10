<template lang="pug">
q-page(:style-fn='myTweak')
  q-splitter(horizontal v-model='splitterModel', style='height: inherit')
    template(v-slot:before)
      sql-editor(@run='onRun')
    template(v-slot:after)
      table-show(
        :rows='excuteResult.rows'
        :total='excuteResult.total'
        :pageSize='pageSize'
        :loading='loading'
        @changedPage='onPageChanged'
        @update:pageSize="val=>pageSize=val"
        )
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
  mounted() {},
  data: () => {
    return {
      splitterModel: 25,
      excuteResult: { total: 0, rows: [] },
      sql: '',
      pageSize: 10,
      loading: false,
    }
  },
  computed: {},
  methods: {
    ...mapActions('pictureStage', ['excuteSQL']),
    // ...mapActions('pictureStage', ['getDrivers', 'getDirs']),
    myTweak(offset) {
      return { height: offset ? `calc(100vh - ${offset}px)` : '100vh', overflow: 'auto' }
    },
    onRun(sql) {
      console.debug(sql)
      this.sql = sql
      this.loading = true
      this.excuteSQL({ sql, pageSize: this.pageSize }).then(result => {
        this.excuteResult = result
        this.loading = false
      })
    },
    onPageChanged({ page, pageSize }) {
      this.excuteSQL({ sql: this.sql, page, pageSize }).then(result => {
        this.excuteResult = result
      })
    },
  },
}
</script>
