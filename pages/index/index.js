var md5 = require('../utils/md5.js')
//var app = getApp()
var detectface = require('../utils/detectface.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // https://picsum.photos/1080/1920/?image=302
    // https://picsum.photos/1080/1920/?random  随机选择一张 1080*1920 的照片
    // https://source.unsplash.com/random/1080x1920 随机选择一张 1080*1920 的照片
    // 也可以使用本地的图片，如 /assets/background.jpg ，先建一个 assets 文件夹，然后放一张图
    image: 'https://picsum.photos/1080/1920/?random', 
    result: null
  },

  detectImage (src) { // 检测图片
    wx.showLoading({ title: '分析中...' })

    const that = this

    wx.uploadFile({  // 上传图片
      url: 'https://ai.qq.com/cgi-bin/appdemo_detectface',//需要在小程序的开发设置那加上这个服务器域名
      filePath: src,//图片的路径，从 getImage 那获得
      name: 'image_file',
      success (res) {
        console.log('检测开始：')
        const result = JSON.parse(res.data)

        if (result.ret == 0) {
          console.log('检测成功：', res)
        }
        // 检测失败
        if (result.ret !== 0) {
          console.log('检测失败：', res)
          wx.showToast({ icon: 'none', title: '没找到你的小脸蛋，再来一次吧~' })
          return false
        }

        that.setData({ result: result.data.face[0] })
        wx.hideLoading()
      }
    })
  },

  bindConfirm(base64Img) {
    //const base64 = base64Img
    //console.log('base64在家吗', base64Img)
    const that = this
    base64Img = getApp()
    //base64Img =getApp().base64
    //console.log('base64Img在家吗', base64Img)
    //console.log('base64在家吗', base64Img.base64)
    wx.showLoading({ title: '分析中...' })
    console.log('开始搞事')
    detectface.request(base64Img, {
      success(res) {
        console.log('可行')
        console.log('检测开始：')
        const result = (res.data)

        if (result.ret == 0) {
          console.log('检测成功：', res)
        }
        // 检测失败
        if (result.ret !== 0) {
          console.log('检测失败：', res)
          wx.showToast({ icon: 'none', title: '没找到你的小脸蛋，再来一次吧~' })
          return false
        }
        that.setData({ result: result.data.face_list[0] })
        wx.hideLoading()
        
      }
    })
  },


  getImage (type = 'camera') { //选取图片
    const that = this
    wx.chooseImage({
      sizeType: ['compressed'], //original 原图，compressed 压缩图
      c: ['album', 'camera'],//album 从相册选图，camera 使用相机
      success(res) {
        const image = res.tempFiles[0]
        console.log(image)

        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success(res) {
            var base64Img=getApp()
            base64Img.base64 = res.data
            //var base64 = res.data
            console.log('data:image/png;base64,' + res.data)//打印图片的base64编码
            that.bindConfirm(res.data)
          }
        })

        // 图片过大
        if (image.size > 1024 * 1000) {
          console.log('图片过大，上传失败', res)//压缩了之后不会过大
          wx.showToast({ icon: 'none', title: '图片过大, 请重新拍张小的！' })
          return false
        }

        that.setData({ image: image.path })//把选取到的图片作为背景图
        //console.log(image.path)//在控制台打印出文件的路径
        //that.detectImage(image.path)//把路径传到 detectImage 那
        //that.bindConfirm(res.data)//把 base64 传到 bindConfirm 那
        //console.log('不是的data:image/png;base64,' + res.data)
      }
    })
  },

  handleCamera () {
    this.getImage()//拍照
  },
  // 因为我在 wx.chooseImage 那的 wx.chooseImage 两个都选择了，所以无论是点击还是长按，都是可以拍照和从相册选图的
  handleChoose () {
    this.getImage('album')//选取照片
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {
    if (this.data.result) {
      return { title: `刚刚测了自己的颜值为【${this.data.result.beauty}】你也赶紧来试试吧！` }
    }
  }
})

/*还是可以改进的，比如
https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000

我可以加用 Promise 封装微信小程序的 Request 请求，或者可以把 bindConfirm 的功能写入到 getImage 里面，以后有空就试试吧，希望不咕咕咕
*/