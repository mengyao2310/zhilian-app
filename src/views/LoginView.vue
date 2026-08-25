<template>
  <div class="page">
    <div class="top-bg login-top">
      <div class="deco-1"></div>
      <div class="deco-2"></div>
    </div>

    <div class="login-body">
      <h1 class="login-title">机电运维数智化平台</h1>
      <p class="login-sub">账号登录</p>

      <div class="login-card">
        <div class="field">
          <label>账号</label>
          <input v-model.trim="account" type="text" placeholder="请输入手机号" />
        </div>
        <div class="field">
          <label>密码</label>
          <input v-model.trim="pwd" type="password" placeholder="请输入密码" @keyup.enter="onLogin" />
        </div>
        <el-button class="login-btn" type="primary" :loading="loading" @click="onLogin">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return { account: '', pwd: '', loading: false }
  },
  methods: {
    onLogin() {
      if (!this.account || !this.pwd) {
        this.$message({ message: '请输入账号和密码', center: true, duration: 1600 })
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$message({ message: '登录成功', center: true, duration: 1400 })
        setTimeout(() => this.$router.replace('/func'), 800)
      }, 600)
    }
  }
}
</script>

<style scoped>
.login-top {
  height: 300px;
}

.login-body {
  position: relative;
  margin-top: -180px;
  padding: 0 24px;
  z-index: 1;
}

.login-title {
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
}

.login-sub {
  margin-top: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.login-card {
  margin-top: 28px;
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 20px 24px;
  box-shadow: 0 8px 24px rgba(31, 62, 114, 0.08);
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: #3d3d3d;
  margin-bottom: 8px;
}

.field input {
  width: 100%;
  height: 44px;
  border: none;
  border-bottom: 1px solid #f2f5fc;
  outline: none;
  font-size: 15px;
  color: #3d3d3d;
  background: transparent;
}

.field input::placeholder {
  color: #c0c4cc;
}

.field input:focus {
  border-bottom-color: #094bef;
}

.login-btn {
  margin-top: 12px;
  width: 100%;
  height: 46px;
  border-radius: 23px;
  background: linear-gradient(0deg, #094bef 0%, #457dff 99%);
  border: none;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 4px;
}
</style>
