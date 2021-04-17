<template lang="pug">
  q-carousel(
    swipeable 
    animated 
    arrows 
    v-model='slide' 
    :fullscreen.sync='fullscreen' 
    height='100%'
    infinite
    :autoplay='autoplay && 2500'
    )
    q-carousel-slide.column.no-wrap.flex-center(
      v-if='pictures.length===0'
      name='none')
      q-icon(name='tv_off' color='primary' size='56px')
    q-carousel-slide(
      v-for='(p,index) in pictures'
      :key='p.key'
      :name='p.key'
      )
      q-img(
        contain
        spinner-color='red'
        :src='p.url'
        :img-class='rotate'
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
          color='orange' 
          v-model='autoplay' 
          label='Auto Play'
          )

      q-carousel-control(position='bottom-right' :offset='[18, 18]')
        q-btn(
          push 
          round 
          dense 
          color='white' 
          text-color='primary' 
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" 
          @click='fullscreen = !fullscreen'
          )

      q-carousel-control(position='bottom-left' :offset='[18, 18]')
        q-btn(
          dense 
          round 
          color='white' 
          text-color='primary' 
          icon='reply'
          @click='turnLeft'
          )
        q-btn.flip-horizontal(
          round 
          dense 
          color='white' 
          text-color='primary' 
          icon='reply'
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
    rotate() {
      return `rotate-${this.angle}`
      // this.t = this.t === 'flip-horizontal' ? 'flip-vertical' : 'flip-horizontal'
      // return this.t
    },
  },
  data() {
    return {
      slide: null,
      fullscreen: false,
      autoplay: false,
      angle: 0,
    }
  },
  methods: {
    turnRight() {
      // this.t = this.t === 'full-height' ? 'full-width' : 'full-height'
      this.angle = this.angle + 90 >= 360 ? 0 : this.angle + 90
      console.debug('turnRight', this.rotate)
    },
    turnLeft() {
      // this.t = this.t === 'full-height' ? 'full-width' : 'full-height'
      this.angle = (this.angle <= 0 ? 360 : this.angle) - 90
      console.debug('turnLeft', this.rotate)
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
