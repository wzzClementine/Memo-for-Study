// pages/merchandise/merchandise.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    record:0,
    taskList:[],
    height01:0,
    height02:0,
    passage:'',
    day:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = getApp().globalData.userId 
    var p = Math.floor(Math.random() * 20 + 1);
    console.log('p',p);
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(res)
        that.setData({
          userInfo: userInfo
        })
      }
    })
    //读取个人信息
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
        console.log('record', res.data)
        that.setData({
          record: res.data
        })
      }
    })
    //获取短语
    wx.request({
      url: 'https://mugic.club/getPassage.php',
      data: {
        id: p
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          passage: res.data
        })
      }
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
        that.setData({
          day: res.data
        })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height01:res.screenHeight*0.2,
          height02:res.screenHeight*0.3
        })
      },
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
      title: '快来签到学习吧~',
      path: '/pages/merchandise/merchandise',
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
//兑换积分
turnTo:function(e){
  wx.navigateTo({
    url: '../signIn/signIn',
  })
}
})