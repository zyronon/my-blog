import Header from "../../components/header/header";
import './About.scss'
import bg from '../../assets/img/about-me-bg.jpg'

export default function About() {

  return (
    <div id="about">
      <div className="body-ctn">
        <Header/>
        <div className="container">
          <div className="about-me">
            <div className="image">
              {/*<img src="../../assets/img/about-me-bg.jpg" alt=""/>*/}
              <img src={bg} alt=""/>
            </div>
            <div className="col">
              <h1 className="name">王念超</h1>
              <h2>个人简介</h2>
              <div className="description">
                <p>
                  从事前端开发；四年前端经验，前端各种类型项目都有其参与开发，写得比较多的偏后台管理系统和小程序
                </p>
                <p>
                  前端各种新技术都玩过，比较喜欢钻研新技术， 三大框架相比之下，我还是比较喜欢Vue。
                </p>
                <p>&nbsp;</p>
                <p>
                  2019年初开始研究网络安全方面，参加过2019、2020两次护网，对网络安全非常感兴趣。在漏洞平台提交过漏洞，也曾拿到一些外国服务器权限并进行内网渗透
                </p>
              </div>
              <h3>参与项目</h3>
              <div className="description">
                <p>2019、2020两次护网</p>
                <p><a href="https://zeroday.hitcon.org/user/onononon/vulnerability" target="_blank">ZeroDay提交记录</a></p>
              </div>
              <h3>联系我</h3>
              <div className="contact-description">
                <ul className="contact">
                  <li className="item">
                    <a href="https://github.com/ttentau" title="@imWildCat 的 Github" target="_blank">
                      <i className="fa fa-github"/>
                    </a>
                  </li>
                  <li className="item">
                    <a title="Contact me" className="winxin">
                      <i className="fa fa-weixin"/>
                    </a>
                  </li>
                  <li className="item">
                    <a href="mailto:zyronon@163.com" title="Contact me">
                      <i className="fa fa-envelope"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}