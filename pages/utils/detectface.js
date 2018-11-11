let md5 = require('./md5.js')
let app_id = '你的 APPID'
let app_key = '你的 APPKEY'
let url = 'https://api.ai.qq.com/fcgi-bin/face/face_detectface'
// 去 https://ai.qq.com/ 创建应用，接入人脸检测与分析这个 API
// 需要在小程序的开发设置那加上这个服务器域名

var request = function (base64Img, callback) {
  const that = this
  let params = {
    app_id: app_id,
    image: getApp().base64,
    nonce_str: Math.random().toString(36).substr(2),
    time_stamp: parseInt(new Date().getTime() / 1000).toString(),
    mode: '0',//关键点,检测模式，0-正常，1-大脸模式（默认1）
  }
  params['sign'] = _genRequestSign(params)
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      callback.success(res)
      //that.setData({ result: result.data.face[0] })
    },
    /*success: function (res) {
      callback.success(res)
    },*/
    fail: function (res) {
      if (callback.fail)
        callback.fail()
    }
  })
}

var _genRequestSign = function(params){
  // 1. 对请求参数按字典升序排序
  params = _sortObject(params)
  // 2. 拼接键值对，value部分进行URL编码
  let paramStr = ''
  let keys = Object.keys(params)
  for (let idx in keys) {
    let key = keys[idx]
    paramStr += key + '=' + encodeURIComponent(params[key]) + '&'
  }
  // 3. 拼接key
  paramStr += 'app_key=' + app_key
  // 4. md5
  return md5.hexMD5(paramStr).toUpperCase()
}

var _sortObject = function(obj){
  var keys = Object.keys(obj).sort()
  var newObj = {}
  for (var i = 0; i < keys.length; i++) {
    newObj[keys[i]] = obj[keys[i]]
  }
  return newObj
}

module.exports = {
  request: request
}