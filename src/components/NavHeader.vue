<template>
  <div class="nav-header">
    <StatusBar dark />
    <div class="nav-row">
      <button class="nav-back" @click="goBack">
        <SvgIcon name="ui:arrow-left:dark" :size="16" />
      </button>
      <div class="nav-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
import StatusBar from './StatusBar.vue'
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'NavHeader',
  components: { StatusBar, SvgIcon },
  props: {
    title: { type: String, default: '' }
  },
  methods: {
    goBack() {
      if (window.history.length > 1) this.$router.back()
      else this.$router.replace('/mine')
    }
  }
}
</script>

<style scoped>
.nav-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 375px;
  height: 88px;
  background: #ffffff;
  z-index: 5;
}

.nav-row {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 375px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-back {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #1f2329;
}

.nav-title {
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  color: #1f2329;
}
</style>
