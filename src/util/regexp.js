export const reg = {
  empty: v => /^\s*$/g.test(v),
  mobile: v => /^1\d{10}$/.test(v),
  code: v => /^\d{6}$/.test(v),
  telephone: v => /^((0\d{2,3}-\d{4,8})|(1\d{10}))$/.test(v),
  attrInObj: (attr, obj) => obj && attr in obj
}

export const msg = {
  mobile: '请输入正确的手机号',
  code: '请输入正确的验证码'
}
