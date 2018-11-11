*BEAUTY*   ![](https://img.shields.io/badge/license-MIT-0a7bbd.svg?longCache=true&style=flat-square)

***

###  说明

这个小程序是在前人的基础上修改的，说白了就是我复制过来修改代码，然后上线的。

小程序的样子是在 [weapp-beauty](https://github.com/zce/weapp-beauty/) 的基础上进行修改的，不过原作者不是调用 API 的，我这里修改成了调用 API 。

>  [https://github.com/zce/weapp-beauty](https://github.com/zce/weapp-beauty/)

过程中使用了下面这个库的代码，用来进行 md5 编码

> [https://github.com/youngjuning/wxMD5](https://github.com/youngjuning/wxMD5)

还用了别的代码的，可是电脑用的谷歌浏览器出问题了，OneTab 的记录全没了，要是以后能找到的话，我补上。

需要去 [https://ai.qq.com](https://ai.qq.com)那创建应用，接入人脸检测与分析这个 API，最后去修改 detectface.js 那的 app_id 和 app_key 。

![detectface.js](https://upload-images.jianshu.io/upload_images/2989110-5762bd81d43ef544.png)

index.js 里的 detectImage 函数可以注释掉或者直接去掉，实际上是用不到的，我保留下来只是为了顺便看一下原作者的代码。

![](https://upload-images.jianshu.io/upload_images/2989110-b748ff37c7ef3014.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 试例

此处的男性是[即刻 CEO](https://web.okjike.com/user/82D23B32-CF36-4C59-AD6F-D05E3552CBF3)，希望我不会被打

![试例图片](https://upload-images.jianshu.io/upload_images/2989110-1bc38437a9849605.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![小程序二维码](https://upload-images.jianshu.io/upload_images/2989110-08dc8b90fedfca54.jpg)



[小程序『颜值检测仪』使用教程兼示范](https://www.bilibili.com/video/av35734615)

### TODO

- [ ] 把 readme 写好，未完成; 
- [ ] 识别后的分享海报，未完成; 