Component({
  data: {
    clearable: false,
    inputValue: ''
  },
  props: {
    showScan: true, // true显示，false关闭 扫码图标按钮
    value: '', // 默认搜索值
  },
  didMount() {
    this.props.onGetSerachInstance(this)
    this.setData({
      inputValue: this.props.value
    })
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    search(e) {
      const value = typeof e === 'string' ? e : e.detail.value
      this.setData({
        inputValue: value
      }, () => {
        this.props.onSearch(value)
      })
    },
    scan() {
      my.scan({
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          this.props.onScan(res.code)
        },
        fail: (res) => { }
      });
    },
    focus() {
      this.setData({
        clearable: true
      })
    },
    blur() {
      this.setData({
        clearable: false
      })
    },
    input(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    clearLoad() {
      this.search('')
    }
  },
});
