// pages/search/search.js
let app = getApp();
const Login = require('../../module/login.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: '授权登录',
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    callback: "",
    callbackParams: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.callback) {
      let callbackParams = {};
      for (let i in options) {
        callbackParams[i] = options[i]
      }
      this.setData({
        callback: options.callback,
        callbackParams
      })
    }
    let that = this; // 查看是否授权     
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息  
              // app.globalData.userInfo = res.userInfo
              wx.login({
                success: logginRes => {

                  let formData = {
                    code: logginRes.code,
                    name: JSON.parse(res.rawData).nickName,
                    avatar: JSON.parse(res.rawData).avatarUrl
                  }
                  Login.login(formData).then(function(data) {
                    wx.setStorageSync('sessionId', data.appLoginUser.sessionId);
                    wx.setStorageSync('nickName', JSON.parse(res.rawData).nickName);
                    wx.setStorageSync('avatarUrl', JSON.parse(res.rawData).avatarUrl);
                    wx.showToast({
                      title: '登录成功',
                    })
                    if (that.data.callback) {
                      let url = that.getCallbackUrl();
                      if (that.data.callback.indexOf("my/my") != -1) {
                        wx.switchTab({
                          url
                        });
                      } else {
                        wx.navigateTo({
                          url
                        })
                      }
                    } else {
                      wx.switchTab({
                        url: '../index/index',
                      });
                    }
                  })
                }
              });
            }
          });
        }
      }
    })
  },
  getCallbackUrl() {
    let callback = this.data.callback.replace("pages", ".."); //获取的链接是pages开头的，没有/开头的，如pages/login/login，需要转化为相对位置
    let url = callback + '?'; //需要跳转的链接
    let callbackParams = this.data.callbackParams;
    for (let i in callbackParams) {
      if (i != "callback") {
        url += i + "=" + callbackParams[i] + "&"; //拼接上需要跳转的链接后面的参数
      }
    }
    url = url.substr(0, url.length - 1); //去掉后面的&
    return url;
  },

  bindGetUserInfo: function(e) {

    let that = this;
    if (e.detail.userInfo) {
      // app.globalData.userInfo = e.detail.userInfo
      //授权成功后，跳转进入小程序首页  
      wx.login({
        success: res => {
          let formData = {
            code: res.code,
            name: e.detail.userInfo.nickName,
            avatar: e.detail.userInfo.avatarUrl
          }
          Login.login(formData).then(function(data) {
            wx.setStorageSync('sessionId', data.appLoginUser.sessionId);
            wx.setStorageSync('nickName', e.detail.userInfo.nickName);
            wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
            if (that.data.callback) {
              let url = that.getCallbackUrl();
              // 如果是底部的tarbar就需要swithTab的方式跳转
              if (that.data.callback.indexOf("my/my") != -1) {
                wx.switchTab({
                  url
                });
              } else {
                wx.navigateTo({
                  url
                })
              }
            } else {
              wx.switchTab({
                url: '../index/index',
              });
            }
          })
        }
      });
    } else {
      //用户按了拒绝按钮     
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  onBackTap: function(e) {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getBarheight()
  },

  getBarheight() {
    if (app.globalData && app.globalData.statusBarHeight && app.globalData.titleBarHeight) {
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight
      });
    } else {
      let that = this
      wx.getSystemInfo({
        success: function(res) {
          if (!app.globalData) {
            app.globalData = {}
          }
          if (res.model.indexOf('iPhone') !== -1) {
            app.globalData.titleBarHeight = 44
          } else {
            app.globalData.titleBarHeight = 48
          }
          app.globalData.statusBarHeight = res.statusBarHeight
          that.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
          });
        },
        failure() {
          that.setData({
            statusBarHeight: 0,
            titleBarHeight: 0
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})


// const app = getApp();
// Page({
//   data: {        //判断小程序的API，回调，参数，组件等是否在当前版本可用。        
//     // canIUse: wx.canIUse('button.open-type.getUserInfo')
//     canIUse: wx.canIUse('button.open-type.getPhoneNumber')

//   },
//   onLoad: function () {
//     var that = this;        // 查看是否授权     
//     wx.getSetting({
//       success: function (res) {
//         if (res.authSetting['scope.userInfo']) {
//           wx.getUserInfo({
//             success: function (res) {
//               console.log(res);
//               //从数据库获取用户信息  
//               app.globalData.userInfo = res.userInfo
//               wx.login({
//                 success: res => {
//                   wx.request({
//                     url: app.globalData.websize + 'api/auth/loginWechat.json',
//                     data: {
//                       code: res.code
//                     },
//                     method: 'post',
//                     header: {
//                       'content-type': 'application/x-www-form-urlencoded' // 默认值
//                     },
//                     success: function (res) {
//                       console.log(res.data.data);
//                       return;
//                       wx.setStorageSync('sessionid', res.data.data.sessionId);
//                       wx.setStorageSync('avatar', res.data.data.avatar);
//                       wx.setStorageSync('nickName', res.data.data.nickName);
//                     }
//                   })
//                   // 发送 res.code 到后台换取 openId, sessionKey, unionId
//                 }
//               });
//               return;
//               wx.navigateTo({
//                 url: '../index/index'
//               });
//             }
//           });
//         }
//       }
//     })
//   },
//   bindGetUserInfo: function (e) {
//     console.log(e.detail.userInfo)
//     if (e.detail.userInfo) {
//       app.globalData.userInfo = e.detail.userInfo
//       //授权成功后，跳转进入小程序首页  
//       wx.login({
//         success: res => {

//           console.log(res)
//           wx.request({
//             url: app.globalData.websize + 'api/auth/login.json',
//             data: {
//               code: res.code,
//               nickname: app.globalData.userInfo.nickName,
//               headImg: app.globalData.userInfo.avatarUrl
//             },
//             method: 'post',
//             header: {
//               'content-type': 'application/x-www-form-urlencoded' // 默认值
//             },
//             success: function (res) {
//               wx.setStorageSync('sessionId', res.data.data.sessionId);
//               // fun();
//               //wx.setStorageSync('openid', res.data.openid)
//               // wx.setStorageSync('session_key', res.data.session_key)
//             }
//           })
//           // 发送 res.code 到后台换取 openId, sessionKey, unionId
//         }
//       });
//       wx.switchTab({
//         url: '../index/index'
//       })
//     } else {
//       //用户按了拒绝按钮     
//       wx.showModal({
//         title: '警告',
//         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//         showCancel: false,
//         confirmText: '返回授权',
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击了“返回授权”')
//           }
//         }
//       })
//     }
//   },
//   getPhoneNumber: function (e) {

//     console.log(e.detail.iv)
//     console.log(e.detail.encryptedData)
//     if (e.detail.encryptedData) {
//       // app.globalData.userInfo = e.detail.userInfo
//       //授权成功后，跳转进入小程序首页  
//       wx.login({
//         success: res => {
//           console.log(res.code);
//           // return;
//           wx.request({
//             url: app.globalData.websize + 'api/auth/genOpenId.json',
//             data: {
//               'code': res.code
//             },
//             method: 'post',
//             header: {
//               'content-type': 'application/x-www-form-urlencoded' // 默认值
//             },
//             success: function (openres) {
//               console.log(openres.data.data);
//               wx.request({
//                 url: app.globalData.websize + 'api/auth/loginWechat.json',
//                 data: {
//                   'sessionid': openres.data.data,
//                   'encryptedData': encodeURIComponent(e.detail.encryptedData),
//                   'iv': e.detail.iv,
//                 },
//                 method: 'post',
//                 header: {
//                   'content-type': 'application/x-www-form-urlencoded' // 默认值
//                 },
//                 success: function (loginres) {
//                   if (loginres.data.status == "2000000"){
//                     wx.setStorageSync('sessionid', loginres.data.data.sessionId);
//                     wx.setStorageSync('avatar', loginres.data.data.avatar);
//                     wx.setStorageSync('nickName', loginres.data.data.nickName);
//                     wx.navigateTo({
//                       url: '../index/index',
//                     });
//                   }else{
//                     wx.showToast({
//                       title: loginres.data.message
//                     })
//                   }
//                 }
//               });
//             }
//           });
//         }
//       });
//     } else {
//       //用户按了拒绝按钮     
//       wx.showModal({
//         title: '警告',
//         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//         showCancel: false,
//         confirmText: '返回授权',
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击了“返回授权”')
//           }
//         }
//       })
//     }
//   },
//   bindGetUserInfo: function (e) {
//     console.log(e.detail.userInfo)
//     if (e.detail.userInfo) {
//       app.globalData.userInfo = e.detail.userInfo
//       //授权成功后，跳转进入小程序首页  
//       wx.login({
//         success: res => {
//           wx.request({
//             url: app.globalData.websize + '/api​/login​/authLogin.json',
//             data: {
//               code: res.code,
//             },
//             method: 'post',
//             header: {
//               'content-type': 'application/x-www-form-urlencoded' // 默认值
//             },
//             success: function (res) {
//               console.log(res);
//               return;
//               wx.setStorageSync('sessionid', res.data.data.sessionId);
//               // fun();
//               //wx.setStorageSync('openid', res.data.openid)
//               // wx.setStorageSync('session_key', res.data.session_key)
//             }
//           })
//           // 发送 res.code 到后台换取 openId, sessionKey, unionId
//         }
//       });      
//       wx.switchTab({
//         url: '../index/index',
//       });
//     } else {
//       //用户按了拒绝按钮     
//       wx.showModal({
//         title: '警告',
//         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//         showCancel: false,
//         confirmText: '返回授权',
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击了“返回授权”')
//           }
//         }
//       })
//     }
//   }
// });