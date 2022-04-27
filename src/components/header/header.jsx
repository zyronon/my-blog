import './header.scss'
import {Link} from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-ctn">
        <div className="blog">
          <Link className="name" to="/">TTentau</Link>
          <div className="signature">
            <span className=" animate__animated ">世</span>
            <span className=" animate__animated ">事</span>
            <span className=" animate__animated ">漫</span>
            <span className=" animate__animated ">随</span>
            <span className=" animate__animated ">流</span>
            <span className=" animate__animated ">水</span>
            <span>，</span>
            <span className=" animate__animated ">算</span>
            <span className=" animate__animated ">来</span>
            <span className=" animate__animated ">一</span>
            <span className=" animate__animated ">梦</span>
            <span className=" animate__animated ">浮</span>
            <span className=" animate__animated ">生</span>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/' data-hover="主页">主页</Link>
            </li>
            <li>
              <Link to="/archive" data-hover="归档">归档</Link>
            </li>
            <li>
              <Link to="/about" data-hover="关于我">关于我</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}