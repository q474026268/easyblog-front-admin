// 引入Vue的createApp函数，用于创建Vue应用实例
import { createApp } from 'vue'

// 引入全局样式文件
import './style.css'

// 引入根组件App
import App from '@/App.vue'

// 引入Vue路由器配置
import router from '@/router'

// 引入ElementPlus UI组件库
import ElementPlus from 'element-plus'

// 引入ElementPlus的CSS样式文件
import "element-plus/dist/index.css"

// 引入iconfont
import "@/assets/icon/iconfont.css"

// 使用createApp创建一个新的Vue应用实例，并传递根组件App
const app = createApp(App)

// 使用Vue路由器插件
app.use(router)

// 使用ElementPlus UI组件库插件
app.use(ElementPlus)

// 将Vue应用实例挂载到DOM中id为'app'的元素上
app.mount('#app')