/**! __CODEPLACEHOLDER_START__ */ /*[PositionForHostEntryCodeBegin]*/ /**! __CODEPLACEHOLDER_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');
require('./importScripts$');

      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../node_modules/mini-ali-ui-rpx/es/collapse/index?hash=a11fdcdff8ea970c65f185a8731cafe48f67047c');
require('../../node_modules/mini-ali-ui-rpx/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui-rpx/es/collapse/collapse-item/index?hash=4dc76819ab39c9009cae231986217ccac63ee3f3');
require('../../node_modules/mini-ali-ui-rpx/es/loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui-rpx/es/list/index?hash=ff3ef3c7f1b25e418970ede3b97f5bdb7ca001ed');
require('../../node_modules/mini-ali-ui-rpx/es/list/auto-size-img/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui-rpx/es/list/list-item/index?hash=3190814a0735b544f0775f9c24bb2c706de37b3f');
require('../../node_modules/mini-ali-ui-rpx/es/am-checkbox/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/search/search?hash=4dc76819ab39c9009cae231986217ccac63ee3f3');
require('../../node_modules/mini-ali-ui-rpx/es/button/index?hash=ff3ef3c7f1b25e418970ede3b97f5bdb7ca001ed');
require('../../pages/index/index?hash=7bbddab6daf225aacc9d22b75bc76db60cf263a4');
require('../../pages/index2/index?hash=7bbddab6daf225aacc9d22b75bc76db60cf263a4');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}