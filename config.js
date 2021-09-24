module.exports = {
  //测试环境
  HTTP_REQUEST_URL: 'https://kite1874.com/rc/api/v1/',
  BASE_URL: 'https://kite1874.com/',

  //生产环境
  // HTTP_REQUEST_URL: 'https://css.lh-home.com.cn/rc/api/v1/',
  // BASE_URL: 'https://css.lh-home.com.cn/',


  // 请求头 
  HEADER: {
    'content-type': 'application/json'
  },
  // 回话密钥名称 
  TOKENNAME: 'X-Access-Token',
  //用户信息缓存名称 
  CACHE_USERINFO: 'USERINFO',
  //code
  CACHE_CODE: "CODE",
  //code获取时间戳
  CACHE_CODE_TIME: "CODETIME",
  //钉钉官方称code有效时间为五分钟，保险起见设置 4.5 分钟
  CODE_EFFECTIVE_TIME: 45000,
  //token缓存名称
  CACHE_TOKEN: 'TOKEN',
  //token获取时间戳
  CACHE_TOKEN_TIME: 'CACHE_TOKEN_TIME',
  //token有效时间
  TOKEN_EFFECTIVE_TIME: 1700000,
}
