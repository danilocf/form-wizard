import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import pt_BR from 'vee-validate/dist/locale/pt_BR'
import './styles.scss'

Vue.use(VeeValidate)
Validator.localize('pt_BR', pt_BR)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
