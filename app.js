import { CACHE_USERINFO } from "./config"
import { mixins } from "./common/mixins"
import "./utils/mixin" //引入mixin依赖
App({
  globalData: {
    userInfo: null
  },
  onLaunch(options) {
    // 调试工具不支持这个更新 API ，程序上可以正常运行
    try {
      const updateManager = my.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate) // 是否有更新
      })

      updateManager.onUpdateReady(function (ret) {
        console.log(ret.version) // 更新版本号
        my.confirm({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        }) 
      })
      updateManager.onUpdateFailed(function () {
        // 新版本下载失败 
      })
    } catch (error) {

    }
    const { data: cacheUserInfo } = dd.getStorageSync({ key: CACHE_USERINFO })
    let userInfo = cacheUserInfo ? JSON.parse(cacheUserInfo) : {}
    this.globalData.userInfo = userInfo
  },  

  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

});

my.mixin(mixins)
