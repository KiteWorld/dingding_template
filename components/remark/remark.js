Component({
  mixins: [],
  data: {},
  props: {
    value: '',
    placeholder: "备注",
    disabled: false,
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    inputRemark(e) {
      this.props.onInput(e.detail.value)
    }
  },
});
