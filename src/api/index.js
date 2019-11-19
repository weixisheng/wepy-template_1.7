import { fetch } from '@/util/request'

export const login = param => fetch('Login/Auth', param, { loading: false }) // 登录
