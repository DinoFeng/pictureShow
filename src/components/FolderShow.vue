<template lang="pug">
.q-pa-md
  q-tree(:nodes='getFolderInfos()', node-key='fullName')
</template>

<script>
import tools from '../util/Tools'
import _ from 'lodash'
export default {
  name: 'FolderShow',
  props: {
    msg: String,
  },
  data: () => {
    return {
      simple: [
        {
          label: 'Satisfied customers (with avatar)',
          // avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              label: 'Good food (with icon)',
              // icon: 'restaurant_menu',
              children: [{ label: 'Quality ingredients' }, { label: 'Good recipe' }],
            },
            {
              label: 'Good service (disabled node with icon)',
              // icon: 'room_service',
              // disabled: true,
              children: [{ label: 'Prompt attention' }, { label: 'Professional waiter' }],
            },
            {
              label: 'Pleasant surroundings (with icon)',
              // icon: 'photo',
              children: [
                {
                  label: 'Happy atmosphere (with image)',
                  // img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png',
                },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' },
              ],
            },
          ],
        },
      ],
      folderInfos: [
        {
          children: [
            { label: 'aa cc' },
            { label: 'aa dd' },
            {
              children: [{ label: 'aa/bb/ee' }, { label: 'aa/bb/ff' }, { label: 'aa/bb/gg' }, { label: 'aa/bb/hh' }],
              label: 'aa bb',
            },
          ],
          label: 'aa',
        },
        { label: 'ii' },
        { label: 'jj' },
        {
          children: [{ label: 'kk/ee' }, { label: 'kk/ff' }, { label: 'kk/gg' }, { label: 'kk/hh' }],
          label: 'kk',
        },
        { label: 'll' },
      ],
    }
  },
  methods: {
    convert(arr, p) {
      console.debug('convert', { arr, p })
      return arr.map(item => {
        const fullName = p ? `${p.fullName}/${item.name}` : item.name
        if (_.has(item, 'files')) {
          return {
            label: item.name,
            children: this.convert(item.files, _.merge({}, item, { fullName })),
            fullName,
          }
        } else {
          return {
            label: item.name,
            fullName,
          }
        }
      })
    },
    getFolderInfos() {
      const x = tools.getFolderFiles(__dirname)
      console.debug('getFolderInfos', x, __dirname)
      // const y = this.convert(x, null)
      // console.debug('getFolderInfos', JSON.stringify(y))
      return y
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
