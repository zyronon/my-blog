// import './article.html' //导入html，不然不会热更新
require('html-loader!./home.html')//导入html，不然不会热更新。注释掉上面的语法是因为，去掉了webpack.config.js里面的html-loader的配置。
// 只能用require了
import './home.scss'

// import '../../components/header/header'


// document.querySelector('.dir').addEventListener('contextmenu', e => {
//     e.preventDefault()
//     e.stopImmediatePropagation()
//     console.log(e);
//     return false;
// })
