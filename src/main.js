import { createApp } from 'vue'
import {  Loading, Dialog, Form, Field, CellGroup, Cell, Stepper, Button, Swipe, SwipeItem, Toast } from 'vant'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App) // 创建实例

app.use(Loading).use(Dialog).use(Toast).use(Form).use(Field).use(CellGroup).use(Cell).use(Stepper).use(Button).use(Swipe).use(SwipeItem);
app.use(router)
app.use(store)

app.mount('#app')