// pages/market/market.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    list:[],
    record:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var that = this
    var id = getApp().globalData.userId
    console.log('id',id)

    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    //读取礼品信息
    wx.request({
      url: 'https://mugic.club/getGiftList.php',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list:res.data
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
        console.log('record',res.data)
        that.setData({
          record:res.data
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
      title: '快来这里兑换礼品吧~',
      path: '/pages/market/market',
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
  //兑换礼品
  recordTogift:function(e){
    var that =this
    var list = this.data.list
    var id = e.currentTarget.id
    var ID = e.currentTarget.dataset.task
    var amount= list[id].amount-1
    var record = this.data.record
    var uID = getApp().globalData.userId; 
    var grecord = list[id].record //礼品的积分
    var record = this.data.record //用户积分
    console.log('id',id)
    console.log('uid',ID)
    if(record>=list[id].record&&list[id].amount>0){
      wx.request({
        url: 'https://mugic.club/changeGiftRecord.php',
        data: {
          ID: ID,
          amount: amount,
        },
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          var record1 = record -grecord 
          console.log()
          //更新
          wx.request({
            url: 'https://mugic.club/getGiftList.php',
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) 
            {
              console.log(res.data)
              that.setData({
                list: res.data
              })
              //修改用户积分
                  wx.request({
                    url: 'https://mugic.club/caculateRecord.php',
                    data: {
                      record: record1,
                      id: uID,
                    },
                    method: "POST",
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                      //读取个人信息
                      wx.request({
                        url: 'https://mugic.club/getUserRecord.php',
                        data: {
                          id: uID,
                        },
                        method: "GET",
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res) {
                          console.log('record', res.data)
                          //添加兑换礼品人信息
                          wx.request({
                            url: 'https://mugic.club/addGiftUser.php', 
                            data: {
                              id:ID,
                              uid:uID
                            },
                            method: "POST",
                            header: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function (res) {
                              console.log(res.data)
                              wx.showToast({
                                title: '兑换成功！',
                              })
                            }
                          })
                          that.setData({
                            record: res.data
                          })
                        }
                      })
                    }
                  })
            }
          })
        }
      })
    }else if(record<list[id].record){
      wx.showToast({
        title: '积分不足哦！',
      })
    } else if (list[id].amount == 0){
      wx.showToast({
        title: '礼品已经兑换完！',
      })

    }
  }

})