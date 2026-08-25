<template>
  <div class="page">
    <div class="top-bg">
      <div class="deco-1"></div>
      <div class="deco-2"></div>
      <StatusBar />
      <h1 class="page-title">机电运维数智化平台</h1>
    </div>

    <div class="page-scroll">
      <div class="content-bg">
        <div class="cards">
          <section v-for="card in cards" :key="card.title" class="func-card">
            <h2 class="card-title">{{ card.title }}</h2>
            <div v-for="(row, i) in rowsOf(card)" :key="i" class="entry-row">
              <div
                v-for="entry in row"
                :key="entry.label"
                class="entry"
                @click="onEntry(entry)"
              >
                <span class="entry-icon" :style="{ background: entry.gradient }">
                  <SvgIcon :name="entry.icon" :size="17.5" />
                </span>
                <span v-if="entry.badge" class="entry-badge">{{ entry.badge }}</span>
                <span class="entry-label">{{ entry.label }}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from '../components/StatusBar.vue'
import SvgIcon from '../components/SvgIcon.vue'
import cards from '../data/functionData.js'

export default {
  name: 'FuncView',
  components: { StatusBar, SvgIcon },
  data() {
    return { cards }
  },
  methods: {
    rowsOf(card) {
      const rows = []
      for (let i = 0; i < card.entries.length; i += 4) {
        rows.push(card.entries.slice(i, i + 4))
      }
      return rows
    },
    onEntry(entry) {
      if (this._msg) this._msg.close()
      this._msg = this.$message({
        message: `「${entry.label}」功能建设中`,
        center: true,
        duration: 1600
      })
    }
  }
}
</script>

<style scoped>
/* 蓝色背景垫在最底层（顶部横幅的蓝），渐变背景层叠加其上 */
.page {
  background: linear-gradient(179deg, #2c66f6 0%, #2c12ee 98%);
}

/* 设计稿 460:08863 容器61102：渐变背景层，顶部12px圆角 + 1px白描边 + 内嵌白高光 */
.content-bg {
  margin-top: 114px;
  min-height: calc(100vh - 114px);
  background: linear-gradient(180deg, #f9fafa 0%, #eff6fd 33%);
  border-radius: 12px 12px 0 0;
  border-top: 1px solid #ffffff;
  box-shadow: inset 0 2px 0 0 #ffffff;
}

.cards {
  padding: 16px 16px 96px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.func-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  padding: 8px 0 0 6.3px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  color: #303133;
}

.entry-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
}

.entry-row:last-child {
  padding-bottom: 0;
}

.entry {
  position: relative;
  width: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.entry:active .entry-icon {
  opacity: 0.85;
}

.entry-icon {
  width: 32px;
  height: 32px;
  border-radius: 6.86px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 1px 0 #ffffff;
}

.entry-badge {
  position: absolute;
  top: -8px;
  right: 1px;
  min-width: 15px;
  height: 20px;
  padding: 0 6px;
  border-radius: 100px;
  background: #f53f3f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 20px;
  color: #ffffff;
}

.entry-label {
  margin-top: 5px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: #242424;
}
</style>
