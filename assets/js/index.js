$(function() {
  getUserInfo()
  //点击按钮实现退出功能
  $('#btnLogout').on('click',function() {
    var layer = layui.layer
    // 提示用户是否退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      //1.清空本地储存中的token
      localStorage.removeItem('token')
      //2.重新跳转到登录页面
      localStorage.href = '/login.html'
      layer.close(index);
    });
  })
})
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type :'GET',
    url :'/my/userinfo',
    // headers 就是请求头配置对象
    // headers : {
    //   Authorization : localStorage.getItem('token') || ''
    //   },
      success : function(res) {
        if(res.status !== 0) {
          return layui.layer.msg('获取用户信息失败')
        }
        // 调用 renderAvatar
        renderAvatar(res.data)
      },
      // 无论成功还是失败都要调用complete函数
      // complete : function(res) {
      //   //在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
      //   if(res.responseJSON.status ===1 && res.responseJSON.message==='身份认证失败！') {
      //     // 1.强制清空token
      //     localStorage.removeItem('token')
      //     //2.强制跳转到登录页面
      //     location.href = '/login.html'
      //   }
      // }
  })
}
// 渲染用户的头像
function renderAvatar(user) {
  //1 获取用户的名称
  var name = user.nickname || user.username
  //2 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
  // 3 按需求渲染用户的头像
  if(user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layyi-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  }else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}