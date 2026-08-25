<template>
  <span class="svg-icon" :style="boxStyle" v-html="svg"></span>
</template>

<script>
import icons from '../icons/index.js'

export default {
  name: 'SvgIcon',
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: 20 }
  },
  computed: {
    svg() {
      return icons[this.name] || ''
    },
    dims() {
      const m = /viewBox="([\d.\s-]+)"/.exec(this.svg)
      if (!m) return null
      const parts = m[1].trim().split(/\s+/).map(Number)
      const w = Math.abs(parts[2])
      const h = Math.abs(parts[3])
      if (!w || !h) return null
      return { w, h }
    },
    boxStyle() {
      if (typeof this.size === 'string') {
        return { width: this.size, height: this.size }
      }
      if (!this.dims) {
        return { width: this.size + 'px', height: this.size + 'px' }
      }
      const { w, h } = this.dims
      const scale = this.size / Math.max(w, h)
      return { width: (w * scale).toFixed(2) + 'px', height: (h * scale).toFixed(2) + 'px' }
    }
  }
}
</script>
