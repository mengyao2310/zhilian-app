<template>
  <nav class="tab-bar">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-item"
      :class="{ active: active === tab.key, disabled: tab.disabled }"
      @click="go(tab)"
    >
      <span class="tab-icon">
        <SvgIcon :name="iconName(tab)" :size="20" />
      </span>
      <span class="tab-label">{{ tab.label }}</span>
    </div>
  </nav>
</template>

<script>
import SvgIcon from './SvgIcon.vue'

export default {
  name: 'TabBar',
  components: { SvgIcon },
  data() {
    return {
      tabs: [
        { key: 'home', label: '首页', disabled: true },
        { key: 'func', label: '功能', to: '/func' },
        { key: 'scan', label: '扫一扫', disabled: true },
        { key: 'mine', label: '我的', to: '/mine' }
      ]
    }
  },
  computed: {
    active() {
      return this.$route.meta.tab || ''
    }
  },
  methods: {
    iconName(tab) {
      const key = tab.key === 'mine' ? 'user' : tab.key
      return this.active === tab.key ? `tab:${key}:active` : `tab:${key}`
    },
    go(tab) {
      if (tab.disabled) return
      if (this.active !== tab.key) this.$router.push(tab.to).catch(() => {})
    }
  }
}
</script>

<style scoped>
.tab-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 72px;
  padding: 8px 10px;
  display: flex;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    inset 0 4px 10px 0 rgba(255, 255, 255, 0.3),
    0 5px 7px 0 rgba(72, 96, 128, 0.1),
    0 4px 10px 0 #a0c6f1;
  z-index: 10;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  height: 50px;
  cursor: pointer;
  border-radius: 20px;
}

.tab-item.disabled {
  cursor: default;
}

.tab-item.active {
  height: 56px;
  padding: 4px 0;
  background: rgba(8, 119, 249, 0.1);
}

.tab-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-label {
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #657184;
}

.tab-item.active .tab-label {
  font-weight: 600;
  color: #094bef;
}
</style>
