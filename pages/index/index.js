import { toast } from "/utils/utils"
Page({

  data: {
    mixinTag: "listMixin",
    searchValue: "搜索默认值"
  },
  toastSuccessHandle() {
    toast.success("toast 演示success")
  },
  toastFailHandle() {
    toast.fail("toast 演示fail 5秒", 5000)
  },
  toastExceptionHandle() {
    toast.exception("toast 演示 exception 2秒", 2000, {
      success: (res) => {
        toast.success("toast 演示 exception 成功回调")
      }
    })
  },
  toastNoneHandle() {
    toast.none("toast 演示成功 None")
  },
  onSearch(value) {
    debugger
    toast.success('搜索成功，值为：' + (value || '空字符串'))
    //小程序和 vue不同，没有绑定，searchValue 要和 value 保持一致时，记得 setData 一下
    this.setData({
      searchValue: value
    })
  },
  onScan() {

  }
});
