import * as Vue from 'vue'
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
// import _ from 'lodash'
import store from './store'
import ElementPlus from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
import './style/index.scss'
import Menus from 'vue3-menus'
import less from 'less'
import { createPinia } from 'pinia'

createApp(App).use(store).use(less).use(router).use(ElementPlus).use(Menus).use(createPinia()).mount('#app')
;(<any>window).Vue = Vue
