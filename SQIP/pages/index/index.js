//index.js
//获取应用实例
const app = getApp();
var id = getApp().globalData.userId; 
var time = require('../../utils/util.js');
Page({
  data: {
     taskList:[{
       tID:0,
       ID:0,
       content:'',
       sign:0
     }, {
       tID: 0,
       ID: 0,
       content: '',
       sign: 0
       }, {
         tID: 0,
         ID: 0,
         content: '',
         sign: 0
     }, {
       tID: 0,
       ID: 0,
       content: '',
       sign: 0
       }, {
         tID: 0,
         ID: 0,
         content: '',
         sign: 0
     }, {
       tID: 0,
       ID: 0,
       content: '',
       sign: 0
     },],
     result:['今日未签到','签到成功！'],
     index:0,
     logs:[],
     userInfo:{},
     id:0,
  },
  onLoad: function () {
    var that = this
    var date = time.formatTime(new Date)
    var abc = getApp().globalData.abc;
    var a=11;
    console.log(date)
    wx.getStorage({
      key: 'date',
      success: function (res) {
        if(res.data==date){
          that.setData({
            index:1
          })          
        }
      },
    })

      //上传数据库
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var record = 0
          console.log(res)
          //var reg = /[\u4e00-\u9fa5]/g;
          //var names = nickName.match(reg);
          //nickName = names.join(""); 
    
          that.setData({
            userInfo: userInfo
          })
          //读取用户ID
          wx.request({
            url: 'https://mugic.club/getUserID.php',
            data: {
              nickName: nickName
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //上传用户信息
              if (!res.data) {
                wx.request({
                  url: 'https://mugic.club/submitUserInfo.php',
                  data: {
                    nickName: nickName,
                    gender: gender,
                    record: record
                  },
                  method: "POST",
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  success: function (res) {
                    console.log(res.data)
                    //读取用户ID
                    wx.request({
                      url: 'https://mugic.club/getUserID.php',
                      data: {
                        nickName: nickName
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        console.log('ID', res.data)
                        getApp().globalData.userId = res.data
                        var id = getApp().globalData.userId;
                        //建立用户签到
                        wx.request({
                          url: 'https://mugic.club/addSignUser.php',
                          data: {
                            id: res.data
                          },
                          method: "POST",
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          success: function (res) {
                            console.log('addsuccess!')
                            //建立初始6条任务框
                            wx.request({
                              url: 'https://mugic.club/addTaskList.php',
                              data: {
                                id: id
                              },
                              method: "POST",
                              header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                              },
                              success: function (res) {
                                console.log('setsuccess!')
                                wx.request({
                                  url: 'https://mugic.club/getTaskList.php',
                                  data: {
                                    id: id
                                  },
                                  method: "GET",
                                  header: {
                                    'content-type': 'application/json'
                                  },
                                  success: function (res) {
                                    console.log(res.data)
                                    console.log(res.data.length)

                                    that.setData({
                                      taskList: res.data
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
                })
              }
            }
          })
       

          //读取用户ID
          wx.request({
            url: 'https://mugic.club/getUserID.php',
            data: {
              nickName: nickName
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (res) { 
              console.log('ID', res.data)
              getApp().globalData.userId=res.data
              that.setData({
                id:res.data
              })
              //更新              
              wx.request({
                url: 'https://mugic.club/getTaskList.php',
                data: {
                  id: res.data
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data)
                  console.log(res.data.length)   
                    that.setData({
                      taskList: res.data
                    })
                
                }
              })
            }
          })
        }
      })

  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    return {
      title: '快来签到学习吧~',
      path: '/pages/index/index',
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
  navigateTo:function(e){
    wx.navigateTo({
      url: '../signIn/signIn',
    })
  },
  //SaveTasks
  saveContent:function(e){
    var that = this
    var id = this.data.id //用户id
    var list = this.data.taskList
    var task = e.detail.value
    var index = e.currentTarget.dataset.task //任务id
    //list[index].content = task
    //list[index].sign = 0

    //上传数据库保存
    wx.request({
      url: 'https://mugic.club/saveTask.php',
      data: {
        id: index,
        task: task,
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        //更新
        wx.request({
          url: 'https://mugic.club/getTaskList.php',
          data: {
            id: id
          },
          method: "GET",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              taskList:res.data
            })
          }
        })
      }
    })
  },
  //完成任务
  complete:function(e){
    var that = this
    var id = e.currentTarget.id
    var taskList = this.data.taskList
    var sign = this.data.taskList[id].sign
    var tID = e.currentTarget.dataset.task
    var ID= this.data.id
    console.log('tID', tID)
    console.log('id', tID)
    if (sign==0&&taskList[id].content!=''){
      wx.showModal({
        title: '提示',
        content: '确认任务已完成？',
        success: function (res) {
          if (res.confirm) {
            //更新          
            wx.request({
              url: 'https://mugic.club/finishTask.php',
              data: {
                id: tID,
                sign:sign
              },
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res.data)
                //更新
                wx.request({
                  url: 'https://mugic.club/getTaskList.php',
                  data: {
                    id: ID
                  },
                  method: "GET",
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data)
                    that.setData({
                      taskList: res.data
                    })
                    //修改用户积分
                    wx.request({
                      url: 'https://mugic.club/getUserRecord.php',
                      data: {
                        id: ID,
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        var record = res.data+1
                        wx.request({
                          url: 'https://mugic.club/caculateRecord.php',
                          data: {
                            record:record,
                            id: ID,
                          },
                          method: "POST",
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          success: function (res) {

                          }
                        })
                      }
                    })

                  }
                })
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '取消已完成？',
        success: function (res) {  
          if (res.confirm) {
            //更新
            wx.request({
              url: 'https://mugic.club/finishTask.php',
              data: {
                id: tID,
                sign: sign
              },
              method: "POST",
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: function (res) {
                console.log(res.data)
                //更新
                wx.request({
                  url: 'https://mugic.club/getTaskList.php',
                  data: {
                    id: ID
                  },
                  method: "GET",
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data)
                    that.setData({
                      taskList: res.data
                    })
                    //修改用户积分
                    wx.request({
                      url: 'https://mugic.club/getUserRecord.php',
                      data: {
                        id: ID,
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        var record = res.data - 1
                        wx.request({
                          url: 'https://mugic.club/caculateRecord.php',
                          data: {
                            record: record,
                            id: ID,
                          },
                          method: "POST",
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          success: function (res) {

                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //重置任务栏
  reset:function(e){
    var that = this
    var id = getApp().globalData.userId; 

    wx.showModal({
      title: '提示',
      content: '确定清空任务栏吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: 'https://mugic.club/delete.php',
            data: {
              id: id,
              content: '',
              sign: 0
            },
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              //更新
              wx.request({
                url: 'https://mugic.club/getTaskList.php',
                data: {
                  id: id
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data)
                  that.setData({
                    taskList: res.data
                  })
                }
              })
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
