import wepy from 'wepy'
import { BASE_URL } from './config'

export const authLogin = () => {
  return new Promise(async (resolve, reject) => {
    let res = await wepy.login()
    wepy.request({
      url: `${BASE_URL}login/Auth`,
      method: 'POST',
      data: { Code: res.code },
      header: {
        'content-type': 'application/json'
      }
    }).then(({data}) => {
      if (data.return_code === '0') {
        wepy.setStorageSync('token', data.return_data.AuthToken)
        wepy.setStorageSync('state', data.return_data.State) // user state
        resolve()
      } else {
        reject(data.return_msg)
      }
    })
  })
}
const doRequest = (url, param, options) => {
  let params = {}
  const trim = (v) => typeof v == 'string' ? v.replace(/(^\s+)|(\s+$)/g, '') : v
  if (param) {
    // Object.entries(param).forEach(v => {
    //   params[trim(v[0])] = trim(v[1])
    // })
    Object.keys(param).forEach(v => {
      params[trim(v)] = trim(param[v])
    })
  } else params = param
  options.loading &&
    wepy.showLoading({
      title: options.loadingText,
      mask: true
    })
  return new Promise((resolve, reject) => {
    wepy.request({
      url: BASE_URL + url,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'AuthToken': wepy.getStorageSync('token')
      }
    }).then(res => {
      options.loading && (wepy.hideLoading())
      let intercept = options.intercept
      res.data = {...res.data, intercept}
      resolve(res.data)
    }).catch(err => {
      options.loading && (wepy.hideLoading())
      wepy.showToast({
        title: '请检查你的网络',
        icon: 'none'
      })
      resolve(err)
      console.log(err)
    })
  })
}
export const fetch = (url, param, options) => {
  let defaultOptions = {loading: true, loadingText: '数据加载中', toast: true, intercept: true}
  let newOptions = Object.assign({}, defaultOptions, options)
  return new Promise((resolve, reject) => {
    resolve(doRequest(url, param, newOptions))
  })
}
