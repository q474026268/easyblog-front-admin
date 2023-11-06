<template>
  <div class="login-body">
    <div class="login-panel">
      <el-form :model="formData">
        <div class="login-title">用户登录</div>
        <el-form-item label="">
          <el-input placeholder="请输入账号" v-model="formData.account" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="请输入密码" v-model="formData.passWord" />
        </el-form-item>
        <el-form-item label="">
          <div class="check-code-panel">
            <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input-panel" />
            <img :src="checkCoudeUrl" class="check-code" @click="onCheckCodeChange">
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox :label="true" v-model="formData.remberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const formData = reactive({
  // 账号 
  account: '',
  // 密码
  passWord: '',
  // 验证码
  checkCode: '',
  // 记住我
  remberMe: false
});

// 获取带有时间戳的URL的函数
const getTimestampedUrl = (basePath) => {
  return `${basePath}?timestamp=${new Date().getTime()}`;
}

// 初始值为带有时间戳的URL
const checkCoudeUrl = ref(getTimestampedUrl('api/checkCode'));

// 当需要更改验证码URL时调用此函数
const onCheckCodeChange = () => {
  // 更新checkCodeUrl的值为新的带有时间戳的URL
  checkCodeUrl.value = getTimestampedUrl('api/checkCode');
};
</script>

<style lang="scss" scoped>
.login-body {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/login_bg.jpg");
  background-size: cover;
  background-position: center;

  .login-panel {
    margin-top: 150px;
    width: 350px;
    float: right;
    margin-right: 100px;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ddd;
    opacity: .85;

    .login-title {
      font-size: 18px;
      text-align: center;
      margin-bottom: 10px;
    }

    .check-code-panel {
      width: 100%;
      display: flex;
      align-items: center;

      .input-panel {
        flex: 1;
        margin-right: 5px;
      }

      .check-code {
        height: 35px;
        cursor: pointer;
      }
    }
  }
}
</style>