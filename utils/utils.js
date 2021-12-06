//判断是否为空，排除 0 和 "" 的情况
export const isEmpty = function (value) {
  if (value !== null && value !== undefined) return true
  return false
}

// 格式化url参数（序列化）
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = '';
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === undefined || obj[key] === null) continue
    parameters += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

//获取上一页面的实例
export function getPrePage() {
  const pages = getCurrentPages()
  const prePage = pages[pages.length - 2]
  return prePage
}

// 刷新 Collapse 视图
export function updateCollapse(...collapsKeys) {
  collapsKeys.forEach(x => {
    let index = null
    if (this[`am-collapse-ids-collapse`]) {
      index = this[`am-collapse-ids-collapse`].findIndex(y => y === x)
    }
    if (index || index === 0) {
      try {
        this[`am-collapse-updates-collapse`][index]()
      } catch (error) {
        console.log(error)
      }
    }
  })

}

// 点击按钮提交成功并返回上一页
export function timeOutBack(tips, cb, time = 1000) {
  my.showToast({
    type: 'success',
    content: tips || '提交成功',
    duration: time,
    success: () => {
      setTimeout(() => {
        if (cb) cb()
        my.navigateBack();
      }, time);
    }
  });
}


// 封装 toast，方便调用
/* 
 type toast 类型
 content 提示文本
 duration 提示持续时长，默认 1秒
 opt　支持 showToast 中所以属性，注意:相同属性名会覆盖，opt 属性的优先级最高，基本只有需要回调的时候用到
*/
export function toast(type, content, duration, opt = {}) {
  my.showToast({
    type: type,
    content: content,
    duration: duration || 1000,
    ...opt
  })
}
["success", "fail", "exception", "none"].forEach(type => toast[type] = (content, duration, opt) => toast(type, content, duration, opt))


// 节流
export function throttle(fn) {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn.call(this, arguments);
      valid = true;
    }, 500)
  }
}


//判断类型工具
export function isType(target, type) {
  let targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
  type = type.toLowerCase()
  return targetType === type
}