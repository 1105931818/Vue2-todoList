import Vue from "vue"
import App from "./App.vue"
import plugins from "./plugins"
/* import { mixin,mixin1 } from "./mixin"
Vue.mixin(mixin)
Vue.mixin(mixin1)    全局混合*/


Vue.config.productionTip = false

//应用（使用）插件
Vue.use(plugins)

/* const Dome = Vue.extend({})
const dome = new Dome
Vue.prototype.test = dome */
/* console.log(Vue.extend({}))  Vue.extend({}) 是VueComponent构造函数，需要new dome创建vc对象*/

/* console.log(Vue.prototype) */

new Vue({
    el:"#root",
    template:`<App></App>`,
    render: createElement => createElement(App),
    beforeCreate(){
        Vue.prototype.$bus = this  //创建全局事件总线
    }
})