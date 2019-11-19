import wepy from 'wepy'

export class InputMixin extends wepy.mixin {
  methods = {
    digitInput (name, e) {
      // 输入框只能输入数字和小数点
      let { value } = e.detail
      value = value.replace(/[^\d.]/g, '')
      this.form[name] = value
      return { value }
    },
    numberInput (name, e) {
      // 输入框只能输入数字
      let { value } = e.detail
      value = value.replace(/[^\d]/g, '')
      this.form[name] = value
      return { value }
    },
    telInput (name, e) {
      // 输入框只能输入数字和-
      let { value } = e.detail
      value = value.replace(/[^\d-]/g, '')
      this.form[name] = value
      return { value }
    }
  }
}

export class DefaultPngMixin extends wepy.mixin {
  methods = {
    defaultPng (index) {
      index >= 0 ? this.list[index].HeadImgUrl = '../../images/avatar.png' : this.userInfo.HeadImgUrl = '../../images/avatar.png'
    }
  }
}
