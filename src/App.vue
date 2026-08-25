<template>
  <div id="app-inner" class="app-inner">
    <router-view />
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script>
import TabBar from './components/TabBar.vue'

export default {
  name: 'App',
  components: { TabBar },
  computed: {
    showTabBar() {
      return !!this.$route.meta.tab
    }
  }
}
</script>

<style scoped>
.app-inner {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
</style>
