import Mock from 'mockjs2'
import { builder, getBody } from '../util'
var axios = require('axios')

const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = ['admin', '21232f297a57a5a743894a0e4a801fc3','abc123'] // admin, ant.design

const login = options => {
  const body = getBody(options)
  console.log('mock: body', body)
  var data = JSON.stringify({
    password: body.password,
    rememberMe: true,
    username: body.username
  })

  var config = {
    method: 'post',
    url: 'https://10.252.12.19:9500/oauth2/token?grant_type=client_credentials',
    headers: {
      'Authorization': 'Basic SV90cTBkMFVaMGVHN3RZMWpaaUxpV2tPcXNNYTpxTzN2TDFxSjhFdE5XR1NlZHNNZ3VpR1lZZ3Nh',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  axios(config)
    .then(function(response) {
      console.log('res===', response)
    })
    .catch(function(error) {
      builder({ isLogin: true }, '账户或密码错误', 401)
    })

  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      username: 'admin',
      password: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      lastLoginIp: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'admin',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      token: '4291d7da9005377ec9aec4a71ea837f'
    },
    '',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
