<template lang="pug">
  q-carousel(
    swipeable 
    animated 
    arrows 
    infinite
    height='100%'
    control-color="primary"
    class="bg-grey-1 text-primary shadow-2 rounded-borders"
    v-model='slide' 
    :fullscreen.sync='fullscreen' 
    :autoplay='autoplay && 2500'
    )
    q-carousel-slide.column.no-wrap.flex-center(
      v-if='pictures.length===0'
      name='none')
      q-icon(name='tv_off' color='primary' size='56px')
    q-carousel-slide.column.no-wrap.flex-center(
      v-for='(p,index) in pictures'
      :key='p.key'
      :name='p.key'
      )
      img(
        :src='p.url'
        :class='imgClass'
        )
      .absolute-top.text-center
        | [{{index+1}}/{{pictures.length}}]{{p.name}}
    template(v-slot:control)
      q-carousel-control.text-white.rounded-borders(
        position='top-right' 
        :offset='[18, 18]' 
        style='background: rgba(0, 0, 0, .3); padding: 4px 8px;'
        )
        q-toggle(
          dense 
          dark 
          label='Auto Play'
          color='orange' 
          v-model='autoplay' 
          )
      q-carousel-control(position='top-left' :offset='[18, 18]')
        q-btn(
          dense 
          text-color='primary' 
          icon='aspect_ratio'
          :label='resize'
          @click='turnResize'
          ) 
      q-carousel-control(position='bottom-right' :offset='[18, 18]')
        q-btn(
          round 
          dense 
          color='white' 
          text-color='primary' 
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" 
          @click='fullscreen = !fullscreen'
          )

      q-carousel-control(position='bottom-left' :offset='[18, 18]')
        q-btn-group(rounded)
          q-btn(
            dense
            color='white' 
            text-color='primary' 
            icon='undo'
            @click='turnLeft'
            )
          q-separator(inset vertical)
          q-btn(
            dense
            color='white' 
            text-color='primary' 
            icon='redo'
            @click='turnRight'
            )
</template>

<script>
import _ from 'lodash'
export default {
  name: 'PictureShow',
  props: {
    pictures: Array,
  },
  computed: {
    imgClass() {
      return [this.rotate, this.resize]
    },
    rotate() {
      return `rotate-${this.angle}`
    },
    resize() {
      return this.resizeList[this.resizeIndex]
    },
  },
  data() {
    return {
      slide: null,
      fullscreen: false,
      autoplay: false,
      angle: 0,
      resizeList: [null, 'full-height', 'full-width', 'window-height', 'window-width', 'block'],
      resizeIndex: 0,
    }
  },
  methods: {
    turnRight() {
      this.angle = this.angle + 90 >= 360 ? 0 : this.angle + 90
      console.debug('turnRight', this.rotate)
    },
    turnLeft() {
      this.angle = (this.angle <= 0 ? 360 : this.angle) - 90
      console.debug('turnLeft', this.rotate)
    },
    turnResize() {
      this.resizeIndex = this.resizeIndex + 1 >= this.resizeList.length ? 0 : this.resizeIndex + 1
    },
  },
  watch: {
    pictures: {
      handler(v) {
        if (_.isArray(v) && v.length > 0) {
          this.slide = v[0].key
        } else {
          this.slide = 'none'
        }
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
.q-carousel__slide {
  padding: 0px;
}
</style>
