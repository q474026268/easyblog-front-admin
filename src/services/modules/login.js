import request from "@/services/request";

// 登录
export function loginAPI(data){
  return request({
    url: '/login',
    method: 'POST',
    showLoading: true,
    data,
    dataType: 'form' // 添加dataType来指示这是一个表单数据
  })
}
