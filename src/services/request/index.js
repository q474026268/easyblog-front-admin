import axios from "axios"
import { ElLoading, ElMessage } from "element-plus"
import router from "@/router";
import { BASE_URL, TIMEOUT, HEADERS } from "./config";


// 创建axios实例
const service = axios.create({
  baseURL: BASE_URL, // 基础URL
  timeout: TIMEOUT, // 超时设置
  headers: HEADERS // 自定义头部
})

let loadingInstance = null; // 加载状态实例
let activeRequests = 0; // 活跃的请求计数

// 开始加载的函数
const startLoading = () => {
  if (activeRequests === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中......',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  activeRequests++;
};

// 停止加载的函数
const stopLoading = () => {
  activeRequests--;
  if (activeRequests === 0 && loadingInstance) {
    loadingInstance.close();
  }
};

// 显示错误消息
const showError = (message) => {
  ElMessage({
    message: message || "请求发生错误",
    type: "error"
  });
};

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果没有特别指定不显示加载状态，则默认显示
    if (config.showLoading !== false) {
      startLoading();
    }
    // 处理FormData类型的数据
    if (config.dataType === 'form') {
      const formData = new FormData();
      Object.keys(config.data).forEach(key => formData.append(key, config.data[key]));
      config.data = formData;
      // 确保Content-Type被设置为multipart/form-data
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  error => {
    // 请求错误时停止加载并显示错误
    stopLoading();
    showError("发送请求失败");
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async response => {
    // 响应成功后停止加载
    stopLoading();
    const { status, info, code, data } = response.data;
    // 根据响应的不同状态进行处理
    if (status === 'error') {
      showError(info);
      return Promise.reject(info); // 当状态为错误时，显示错误信息并拒绝promise
    } else {
      switch (code) {
        case 200:
          return data; // 当响应码为200时，返回数据
        case 901:
          router.push("/login"); // 当响应码为901时，跳转到登录页面
          return Promise.reject("登录超时"); // 并返回一个拒绝的promise
        default:
          return Promise.reject("未知错误"); // 对于其他响应码，返回未知错误
      }
    }
  },
  error => {
    stopLoading(); // 响应失败时停止加载
    showError("接收响应失败"); // 显示错误信息
    return Promise.reject(error); // 并返回一个拒绝的promise
  }
);

export default service; // 导出封装好的axios服务