<template>
  <div class="page sub-page">
    <NavHeader title="清除缓存" />

    <div class="page-scroll">
      <div class="cache-total">
        <div class="ring">
          <svg viewBox="0 0 120 120">
            <circle class="ring-bg" cx="60" cy="60" r="52" />
            <circle class="ring-fg" cx="60" cy="60" r="52" :style="{ strokeDashoffset }" />
          </svg>
          <div class="ring-center">
            <p class="total-num">{{ total }}</p>
            <p class="total-label">缓存总量</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="bb-outline" @click="goBack">返回</div>
      <div class="bb-primary" :class="{ loading: clearing }" @click="onClear">
        {{ clearing ? '清理中…' : '清除缓存' }}
      </div>
    </div>

    <transition name="toast">
      <div v-if="toast" class="toast-text">缓存已清除</div>
    </transition>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'

const CACHE_KEY = 'app_cache_mb'
const TOTAL_MB = 300

export default {
  name: 'CacheView',
  components: { NavHeader },
  data() {
    return {
      clearing: false,
      toast: false,
      usedMb: parseFloat(localStorage.getItem(CACHE_KEY) || '12.6')
    }
  },
  computed: {
    total() {
      return this.usedMb.toFixed(1) + 'M'
    },
    strokeDashoffset() {
      const C = 2 * Math.PI * 52
      return C * (1 - Math.min(100, this.usedMb / TOTAL_MB))
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onClear() {
      this.clearing = true
      setTimeout(() => {
        this.usedMb = 0
        localStorage.setItem(CACHE_KEY, '0')
        this.clearing = false
        this.toast = true
        clearTimeout(this._toastTimer)
        this._toastTimer = setTimeout(() => { this.toast = false }, 1600)
      }, 900)
    }
  }
}
</script>

<style scoped>
.cache-total {
  background: #ffffff;
  border-radius: 12px;
  padding: 36px 0;
  display: flex;
  justify-content: center;
}

.ring {
  position: relative;
  width: 160px;
  height: 160px;
}

.ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg,
.ring-fg {
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
}

.ring-bg {
  stroke: #eef1f7;
}

.ring-fg {
  stroke: #2c66f6;
  stroke-dasharray: 326.7;
  transition: stroke-dashoffset 0.6s ease;
}

.ring-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.total-num {
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 28px;
  line-height: 34px;
  font-weight: 700;
  color: #1f2329;
}

.total-label {
  margin-top: 2px;
  font-size: 12px;
  line-height: 18px;
  color: #c0c4cc;
}

.toast-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #1f2329;
  z-index: 20;
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
}
</style>
