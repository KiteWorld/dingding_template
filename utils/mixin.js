import { isType } from "./utils"
//自定义小程序页面 page 的 mixin 功能（不同于 behaviors）
const nativePage = Page
const lifecycle = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onTitleClick']
let globalMixin = null


//全局mixin方法
my.mixin = function (mixins) {
  if (isType(mixins, 'object')) {
    globalMixin = mixins
  }
}

Page = function (config) {
  //加入全局mixin
  if (globalMixin && config.data) {
    //判断当前面的页面实例 mixinTag 是否匹配，匹配则把对应 mixin 内容加上 
    const mixinTag = config.data.mixinTag
    if (mixinTag && globalMixin[mixinTag]) {
      merge([globalMixin[mixinTag]], config)
    }
  }
  nativePage(config)
}

function merge(mixins, config) {
  mixins.forEach(mixin => {
    if (isType(mixin, 'object')) {
      //合并data、生命周期以及其他数据
      Object.keys(mixin).forEach(key => {
        if (key === 'data') {
          config[key] = Object.assign({}, mixin[key], config[key])
        } else if (lifecycle.includes(key)) {
          let nativeLifecycle = config[key]
          config[key] = function () {
            let arg = Array.prototype.slice.call(arguments)
            mixin[key].call(this, arg)
            return nativeLifecycle && nativeLifecycle.call(this, arg)
          }
        } else {
          config[key] = mixin[key]
        }
      })
    }
  })
}
