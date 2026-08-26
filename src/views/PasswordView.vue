<template>
  <div class="page sub-page">
    <NavHeader title="密码修改" />

    <div class="page-scroll">
      <div class="form-card">
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model.trim="form.oldPwd" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model.trim="form.newPwd" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input v-model.trim="form.confirmPwd" type="password" placeholder="请输入密码" show-password />
            <div class="pwd-tip">密码必须包含大写字母、小写字母、数值、特殊符号中至少三种且不少于8位</div>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="bb-outline" @click="onReset">重置</div>
      <div class="bb-primary" :class="{ loading: saving }" @click="onSave">
        {{ saving ? '保存中…' : '保存' }}
      </div>
    </div>

    <transition name="toast-fade">
      <div v-if="toast" class="success-toast">
        <svg class="toast-icon" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.1957523949541378,6.071691244862413C0.021010564954137802,5.897207544862414,-0.007244632045862197,5.6259005448624135,0.1467826749541378,5.431720544862413L0.5069253449541378,4.977693844862413C0.6545467649541378,4.791589544862413,0.9306893049541378,4.744847544862413,1.1258689149541379,4.875119944862414L4.243012514954138,6.955653944862413C4.407439814954138,7.065400344862414,4.690418814954138,7.051107644862413,4.8439375149541375,6.926558244862413L13.080737714954138,0.2440481648624134C13.265873714954138,0.0938478598624134,13.555876714954138,0.10664931286241341,13.718148714954138,0.2686805048624134L13.921039714954137,0.4712727548624134C14.097608714954138,0.6475806448624134,14.084772714954138,0.9274479948624134,13.899676714954138,1.1122709148624135L5.059164114954138,9.939717544862413C4.7841125149541375,10.214362144862413,4.332521514954138,10.202346144862414,4.049383214954138,9.919626444862413L0.1957523949541378,6.071691244862413Z" fill="#ffffff"/>
        </svg>
        <span class="toast-text">提交成功</span>
      </div>
    </transition>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'

export default {
  name: 'PasswordView',
  components: { NavHeader },
  data() {
    const checkConfirm = (rule, value, callback) => {
      if (value !== this.form.newPwd) callback(new Error('两次输入的密码不一致'))
      else callback()
    }
    const checkPwdStrength = (rule, value, callback) => {
      if (!value) return callback()
      const kinds = [/[A-Z]/, /[a-z]/, /\d/, /[^A-Za-z0-9]/].filter(re => re.test(value)).length
      if (kinds < 3) callback(new Error('密码需包含大写字母、小写字母、数字、特殊符号中至少三种'))
      else callback()
    }
    return {
      saving: false,
      toast: false,
      form: { oldPwd: '', newPwd: '', confirmPwd: '' },
      rules: {
        oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度为 8-20 位', trigger: 'blur' },
          { validator: checkPwdStrength, trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: checkConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onReset() {
      this.$refs.form.resetFields()
    },
    onSave() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.saving = true
        setTimeout(() => {
          this.saving = false
          this.toast = true
          setTimeout(() => {
            this.toast = false
            this.$router.back()
          }, 1600)
        }, 600)
      })
    }
  }
}
</script>

<style scoped>
.form-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 4px 16px;
}

.form-card >>> .el-form-item__label {
  font-family: 'PingFang SC', Inter, sans-serif;
  font-size: 15px;
  line-height: 32px;
  font-weight: 500;
  color: #1f2329;
  padding: 0;
}

.form-card >>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #f2f5fc;
  border-radius: 0;
  padding: 0;
  font-size: 15px;
  color: #1f2329;
  transition: border-color 0.25s ease;
}

.form-card >>> .el-input__inner:focus {
  border-bottom-color: #2c66f6;
}

.pwd-tip {
  margin-top: 12px;
  font-size: 13px;
  line-height: 20px;
  color: #8a919f;
}

/* 提交成功 Toast：MasterGo 带图标提示组件 */
.success-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 16px;
  z-index: 2000;
  box-sizing: border-box;
}

.toast-icon {
  width: 36px;
  height: 36px;
  flex: none;
}

.toast-text {
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease;
}

.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
}
</style>
