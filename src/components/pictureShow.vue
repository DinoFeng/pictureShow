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
    q-carousel-slide(
      v-for='p in pictures'
      :key='p.key'
      :name='p.key'
      )
      q-img(
        contain
        :src='p.url'
        :img-class='rotate'
        )
    //- q-carousel-slide(:name='1' img-src='https://cdn.quasar.dev/img/mountains.jpg')
    //- q-carousel-slide(:name='2' img-src='https://cdn.quasar.dev/img/parallax1.jpg')
    //- q-carousel-slide(:name='3' img-src='https://cdn.quasar.dev/img/parallax2.jpg')
    //- q-carousel-slide(:name='4' img-src='https://cdn.quasar.dev/img/quasar.jpg')
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
      return `rotate-${this.angle} fit`
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
      t: '',
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
.q-carousel__slide {
  padding: 0px;
}
/* span {
  color: brown;
} */
</style>
