import Vue from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
new Vue({
  el: '#app',
  render: h => h(App)
})

const numFormat = new Intl.NumberFormat('en-US',{
        style: "currency",
        currency: "USD"
    }
)

Vue.directive('price', {
    inserted(el,binding) {
        el.innerHTML = numFormat.format(binding.value)
    },
    update(el,binding) {
        el.innerHTML = numFormat.format(binding.value)
    }
})
