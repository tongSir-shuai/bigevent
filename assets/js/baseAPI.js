var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function(options) {
  options.url = baseURL + options.url
  console.log(options)
})