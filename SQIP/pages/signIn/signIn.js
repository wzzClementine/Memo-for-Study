// pages/signIn/signIn.js
const app = getApp();
var time = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signList: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    day:0,
    numberOfDays:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = getApp().globalData.userId
    var signList=this.data.signList
    wx.getStorage({
      key: 'date',
      success: function(res) {
        that.setData({
          day:res.data
        })
      },
    })
    //读取签到天数
    wx.request({
      url: 'https://mugic.club/getSignDay.php',
      data: {
        id: id
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('number', res.data)
        for(var i=0;i<res.data;i++){
          signList[i]=1
        }
        that.setData({
          signList:signList,
          numberOfDays:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '快来和我一起签到学习吧~',
      path: '/pages/signIn/signIn',
      success: function (res) {
        // 转发成功
        console.log('successful!')
      },
      fail: function (res) {
        // 转发失败
        console.log('failed!')
      }
    }

  },
  //签到
  signIn:function(e){
    var that = this
    var date = time.formatTime(new Date);
    var id = getApp().globalData.userId
    var signList =this.data.signList
    if(date==this.data.day){
      wx.showToast({
        title:'今日已签到！',
      })
      setTimeout(function () {
        wx.reLaunch({
          url: '../index/index',
        })
      }, 1000)
    }else{
      wx.setStorage({
        key: 'date',
        data: date,
      })     
      //读取签到天数
      wx.request({
        url: 'https://mugic.club/getSignDay.php',
        data: {
          id: id
        },
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var days=res.data+1
          //增加签到天数
          wx.request({
            url: 'https://mugic.club/addSignDay.php',
            data: {
              id: id,
              day: days
            },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              //读取签到天数
              wx.request({
                url: 'https://mugic.club/getSignDay.php',
                data: {
                  id: id
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log('number', res.data)
                  for (var i = 0; i < res.data; i++) {
                    signList[i] = 1
                  }
                  that.setData({
                    signList: signList,
                    numberOfDays: res.data
                  })
                  //修改用户积分
                  wx.request({
                    url: 'https://mugic.club/getUserRecord.php',
                    data: {
                      id: id,
                    },
                    method: "GET",
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      var record = res.data + 4
                      wx.request({
                        url: 'https://mugic.club/caculateRecord.php',
                        data: {
                          record: record,
                          id: id,
                        },
                        method: "POST",
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
                          wx.showToast({
                            title: '今日签到成功！',
                          })
                          setTimeout(function () {
                            wx.reLaunch({
                              url: '../index/index',
                            })
                          }, 1000)
                        }
                      })
                    }
                  })
                }
              })  
            }
          })
        }
      })
    }
  },
  //签到
  signI:function(e){
    var that = this
    var num = this.data.count
    var date = time.formatTime(new Date).day
    var isSign = this.data.isSign
    if(isSign==0){
      num++;
      if (num <= 21) {
        that.setData({
          count: num
        })
        var array = []
        for (var i = 0; i < num; i++) {
          array.push(1)
        }

        for (var i = num; i < 21; i++) {
          array.push(0)
        }
        that.setData({
          signList: array
        })
        wx.setStorage({
          key: 'array',
          data: this.data.signList,
        })
        wx.setStorage({
          key: 'count',
          data: this.data.count,
        })
        wx.showToast({
          title: '今日签到成功！',
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../index/index',
          })
        }, 1000)
        wx.setStorage({
          key: 'date',
          data: date,
        })
      } else {
        wx.showToast({
          title: '已经达到21天了哦~',
        })
      }
    }else{
      wx.showToast({
        title: '今日已签到',
      })
    }
    

  },
})