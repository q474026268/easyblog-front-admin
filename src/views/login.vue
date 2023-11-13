<template>
  <div class="login-body">
    <div class="login-panel">
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <div class="login-title">用户登录</div>
        <el-form-item prop="account">
          <el-input placeholder="请输入账号" v-model="formData.account" size="large">
            <template #prefix>
              <span class="icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="formData.password" size="large" type="password">
            <template #prefix>
              <span class="icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input-panel" size="large" />
            <img :src="checkCodeUrl" class="check-code" @click="onCheckCodeChange">
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox :label="true" v-model="formData.remberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import md5 from "js-md5"
import { loginAPI } from "@/services/modules/login"

// 定义API端点对象
const api = {
  checkCode: 'api/checkCode' // 验证码API路径
}

// 创建一个ref，通常用于引用表单元素
const formDataRef = ref()

const formData = reactive({
  // 账号 
  account: '18666666666',
  // 密码
  password: 'admin123',
  // 验证码
  checkCode: '',
  // 记住我
  remberMe: false
});

// 表单验证规则对象
const rules = {
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  checkCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}

// 获取带有时间戳的URL的函数
const getTimestampedUrl = (basePath) => {
  return `${basePath}?timestamp=${new Date().getTime()}`;
}

// 初始值为带有时间戳的URL
const checkCodeUrl = ref(getTimestampedUrl(api.checkCode));

// 当需要更改验证码URL时调用此函数
const onCheckCodeChange = () => {
  // 更新checkCodeUrl的值为新的带有时间戳的URL
  checkCodeUrl.value = getTimestampedUrl(api.checkCode);
};


// 登录函数，用于处理登录表单提交
const login = () => {
  // 验证表单数据
  formDataRef.value.validate(async (valid) => {
    if (valid) {
      const params = {...formData};
      params.password = md5(params.password)
      const data = await loginAPI(params);
    } else {
      // 如果验证未通过，可以在这里处理，如弹出提示等
      console.error('Validation failed.');
    }
  })
}
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
        cursor: pointer;
      }
    }
  }
}
</style>