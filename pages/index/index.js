import { toast, updateCollapse } from "/utils/utils"
Page({

  data: {
    mixinTag: "listMixin",
    searchValue: "搜索默认值",
    collapses: ["normalCallapses", 'autoHeightCallapses'],
    collapsesData: "5秒后，是否会自适应"
  },
  onLoad() {
    //无法自适应，是因为组件已经挂载完成了，数据源才加载出来。
    setTimeout(() => {
      this.setData({
        collapsesData: "你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度，你猜我能不能自适应高度"
      }, () => {
        //刷新 Collapse 视图
        updateCollapse.call(this, 'autoHeightCallapses')
      })
    }, 5000)
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
    toast.success('搜索成功，值为：' + (value || '空字符串'))
    //小程序和 vue不同，没有绑定，searchValue 要和 value 保持一致时，记得 setData 一下
    this.setData({
      searchValue: value
    })
  },
  onScan() {

  }
});
