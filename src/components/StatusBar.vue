<template>
  <div class="status-bar" :class="{ dark }">
    <span class="time">{{ time }}</span>
    <div class="right">
      <SvgIcon :name="dark ? 'ui:cellular:dark' : 'ui:cellular'" :size="17" class="cellular" />
      <SvgIcon :name="dark ? 'ui:wifi:dark' : 'ui:wifi'" :size="15.34" class="wifi" />
      <div class="battery">
        <div class="battery-border"></div>
        <div class="battery-cap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'StatusBar',
  components: { SvgIcon },
  props: {
    dark: { type: Boolean, default: false }
  },
  data() {
    return { now: new Date() }
  },
  computed: {
    time() {
      const h = this.now.getHours()
      const m = String(this.now.getMinutes()).padStart(2, '0')
      return `${h}:${m}`
    }
  },
  mounted() {
    this.timer = setInterval(() => { this.now = new Date() }, 30000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.status-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 375px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.time {
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.33px;
  color: #fff;
  transform: translateY(7px);
}

.status-bar.dark .time {
  color: #1f2329;
}

.status-bar.dark .battery-border {
  border-color: rgba(31, 35, 41, 0.35);
}

.status-bar.dark .battery-border::after {
  background: #1f2329;
}

.status-bar.dark .battery-cap {
  background: rgba(31, 35, 41, 0.4);
}

.right {
  display: flex;
  align-items: center;
  gap: 5px;
  transform: translateY(8px);
}

.battery {
  position: relative;
  width: 25px;
  height: 12px;
}

.battery-border {
  position: absolute;
  left: 0;
  top: 0.33px;
  width: 22px;
  height: 11.33px;
  border-radius: 2.67px;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.battery-border::after {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 18px;
  height: 7.33px;
  border-radius: 1.33px;
  background: #fff;
}

.battery-cap {
  position: absolute;
  right: 0;
  top: 4px;
  width: 1.33px;
  height: 4px;
  border-radius: 0 1px 1px 0;
  background: rgba(255, 255, 255, 0.4);
}
</style>
