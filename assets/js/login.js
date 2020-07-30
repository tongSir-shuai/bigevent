$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })



  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  //从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  //通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义一个叫做pwd 的检验规则 
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框和中的内容
      //还需要拿到密码框中的内容
      //然后进行一次判断
      //如果判断失败，则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if(pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })


//监听注册表单的提交事件
$('#form_reg').on('submit',function(e) {
  e.preventDefault();
  $.post('/api/reguser',{
    username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()
  },function(res) {
    if(res.status !==0) {
      return layer.msg(res.message)
    }
    layer.msg(res.message);
    $('#link_login').click()
    $('#form_reg')[0].reset()
  })
})


$('#form_login').on('submit',function(e) {
  e.preventDefault();
  $.ajax({
    type:'post',
    url : '/api/login',
    data: $(this).serialize(),
    success: function(res) {
      if(res.status != 0 ) {
        return layer.msg(res.message)
      }
      layer.msg(res.message);
      localStorage.setItem("token",res.token)
      location.href = "/index.html"
    }
  })
})
})