<template>
  <div class="page">
    <div class="top-bg mine-top">
      <div class="mine-circle-1"></div>
      <div class="mine-circle-2"></div>
      <StatusBar />
      <div class="user-card">
        <div class="user-main">
          <span class="user-name">傅智翔</span>
          <span class="user-phone">15392830508</span>
        </div>
        <div class="user-org">杭州北管理中心-机电信息处</div>
      </div>
    </div>

    <div class="page-scroll">
      <div class="menu-card">
        <div class="menu-list">
          <div
            v-for="item in menus"
            :key="item.label"
            class="menu-item"
            :class="{ 'no-line': !item.divider }"
            :style="{ height: item.height + 'px' }"
            @click="onMenu(item)"
          >
            <span class="menu-icon">
              <SvgIcon :name="item.icon" :size="item.iconSize" />
            </span>
            <span class="menu-label">{{ item.label }}</span>
            <span v-if="item.value" class="menu-value" :class="{ 'with-arrow': item.arrow }">{{ item.value }}</span>
            <span v-if="item.arrow" class="menu-arrow">
              <SvgIcon name="ui:arrow-right" :size="10" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <transition name="sheet-fade">
      <div v-if="sheet" class="dialog-mask" @click="sheet = false"></div>
    </transition>
    <transition name="dialog-pop">
      <div v-if="sheet" class="dialog">
        <p class="dlg-title">退出登录</p>
        <p class="dlg-msg">退出后不会删除任何历史数据</p>
        <div class="dlg-btns">
          <div class="dlg-btn" @click="sheet = false">取消</div>
          <div class="dlg-btn danger" @click="doLogout">退出</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import StatusBar from '../components/StatusBar.vue'

import SvgIcon from '../components/SvgIcon.vue'

export default {
  name: 'MineView',
  components: { StatusBar, SvgIcon },
  data() {
    return {
      sheet: false,
      menus: [
        { label: '密码修改', icon: 'mine:password', iconSize: 20, height: 44, arrow: true, divider: true, to: '/password' },
        { label: '清除缓存', icon: 'mine:cache', iconSize: 20, height: 48, arrow: true, divider: true, to: '/cache', value: '' },
        { label: '关于系统', icon: 'mine:about', iconSize: 20, height: 48, arrow: false, divider: true, value: 'v2.3.0' },
        { label: '退出登录', icon: 'mine:logout', iconSize: 20, height: 48, arrow: false, divider: false }
      ]
    }
  },
  created() {
    this.syncCache()
  },
  activated() {
    this.syncCache()
  },
  methods: {
    syncCache() {
      const cache = this.menus.find(m => m.label === '清除缓存')
      const mb = localStorage.getItem('app_cache_mb')
      cache.value = mb === '0' ? '' : (mb || '12.6') + 'M'
    },
    onMenu(item) {
      if (item.label === '退出登录') {
        this.sheet = true
        return
      }
      if (item.to) {
        this.$router.push(item.to)
      }
    },
    doLogout() {
      this.sheet = false
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.mine-top {
  height: 186px;
}

.mine-circle-1 {
  position: absolute;
  left: 254px;
  top: 66px;
  width: 161px;
  height: 161px;
  border-radius: 50%;
  border: 1px solid transparent;
  background:
    linear-gradient(202deg, rgba(255, 255, 255, 0.09) 9%, rgba(255, 255, 255, 0) 63%) padding-box,
    linear-gradient(230deg, rgba(255, 255, 255, 0.35) 20%, rgba(255, 255, 255, 0) 77%) border-box;
}

.mine-circle-2 {
  position: absolute;
  left: 104px;
  top: -44px;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 1px solid transparent;
  background:
    linear-gradient(200deg, rgba(255, 255, 255, 0.09) 9%, rgba(255, 255, 255, 0) 90%) padding-box,
    linear-gradient(203deg, rgba(255, 255, 255, 0.35) 10%, rgba(255, 255, 255, 0) 62%) border-box;
}

.user-card {
  position: absolute;
  left: 16px;
  top: 49px;
  width: 343px;
  height: 94px;
  padding: 16px 12px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-main {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 30px;
}

.user-name {
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  color: #ffffff;
}

.user-phone {
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: #ffffff;
  padding-bottom: 1px;
}

.user-org {
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #ffffff;
}

.menu-card {
  margin-top: 158px;
  background: #ffffff;
  border-radius: 12px;
}

.menu-list {
  padding: 28px;
}

.menu-item {
  position: relative;
  width: 319px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f2f5fc;
}

.menu-item.no-line {
  border-bottom: none;
}

.menu-item:active {
  background: #f7f9fe;
}

.menu-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: none;
}

.menu-label {
  margin-left: 8px;
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #3d3d3d;
}

.menu-value {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #909399;
}

.menu-value.with-arrow {
  right: 30px;
}

.menu-arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f2f5fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.dialog-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  text-align: center;
  padding: 24px 20px 0;
  z-index: 51;
}

.dlg-title {
  margin-top: 24px;
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 17px;
  line-height: 24px;
  font-weight: 600;
  color: #1f2329;
}

.dlg-msg {
  margin-top: 4px;
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: #909399;
}

.dlg-btns {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-bottom: 20px;
}

.dlg-btn {
  flex: 1;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 16px;
  color: #1f2329;
  background: #f2f5fc;
  cursor: pointer;
}

.dlg-btn.danger {
  font-weight: 600;
  color: #ffffff;
  background: #eb1111;
}

.dlg-btn:active {
  opacity: 0.85;
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.25s ease;
}

.sheet-fade-enter,
.sheet-fade-leave-to {
  opacity: 0;
}

.dialog-pop-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dialog-pop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dialog-pop-enter,
.dialog-pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
