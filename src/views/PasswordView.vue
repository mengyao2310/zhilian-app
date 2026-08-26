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
          this.$message({ message: '密码修改成功，请重新登录', center: true, duration: 1600 })
          setTimeout(() => this.$router.replace('/login'), 1200)
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
  font-size: 14px;
  line-height: 32px;
  font-weight: 500;
  color: #1f2329;
  padding: 0;
}

.form-card >>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #f2f5fc;
  border-radius: 0;
  padding: 0 2px;
  font-size: 15px;
  color: #1f2329;
  transition: border-color 0.25s ease;
}

.form-card >>> .el-input__inner:focus {
  border-bottom-color: #2c66f6;
}

.pwd-tip {
  margin-top: 4px;
  font-size: 13px;
  line-height: 20px;
  color: #8a919f;
}
</style>
