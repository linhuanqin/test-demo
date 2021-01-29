import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './assets/router'
import axios from 'axios'
import config from './lib/config/config.js'
import stringUtil from './assets/utils/stringUtil'
import dateUtil from './assets/utils/dateUtil'


Vue.use(MintUI)
Vue.use(router)
Vue.use(config)

Vue.prototype.$utils = {
    string: stringUtil,
    date: dateUtil
}

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.transformRequest = function (data) {
	return JSON.stringify(data)
}
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
