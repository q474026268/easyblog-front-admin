import axios from axios

const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8"
const contentTypeJson = "application/json"
const contentTypeFile = "multipart/form-data"

const request = (config) => {
  const { url, params = {}, dataType = 'json', showLoading } = config;
}

export default request;