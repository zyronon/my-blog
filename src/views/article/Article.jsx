import './Article.scss'
import Header from "../../components/header/Header";
import {useState, useEffect} from "react";
import {dateFormat, http} from "../../utils/common";
import config from "../../config";
import Loading from "../../components/loading/Loading";


export default function Article() {
  let [article, setArticle] = useState({})
  let [showTop, setShowTop] = useState(false)

  function date(v, type = 'yyyy-MM-dd') {
    return dateFormat(v * 1000, type)
  }

  async function getData() {
    let [ok, res] = await http(config.apiUrl + '/v1/article/previewDetail' + location.search)
    if (ok) {
      setArticle(res.data)
    }
  }

  useEffect(() => {
    getData()
    window.onscroll = onScroll
  }, [])


  function onScroll() {
    let sTop = document.documentElement.scrollTop || document.body.scrollTop
    setShowTop(sTop > 300)
  }

  function scrollToTop() {
    let sTop = document.documentElement.scrollTop || document.body.scrollTop
    if (sTop > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, sTop - sTop / 8)
    }
  }


  return (
    <div id="article">
      <Header/>
      <div className="wrapper">
        <div className='header'>
          <div className="title">
            {article.title}
          </div>
          <div className="date-ctn">
            <span className="date">{date(article.updateTime)}</span>
          </div>
        </div>
        <Loading show={!article.isMarkdownEditor}>
          <section
            className={article.isMarkdownEditor ? 'markdown-body' : ''}
            dangerouslySetInnerHTML={{__html: article.htmlContent}}
          >
          </section>
        </Loading>

        {
          showTop &&
          <div className="go-top" onClick={scrollToTop}>
            <svg t="1651217398350" className="icon" viewBox="0 0 1025 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="2231" width="200" height="200">
              <path
                d="M131.339914 423.017198c-9.52111 9.670597-9.400291 25.229558 0.270306 34.750668 9.670597 9.522134 25.229558 9.401315 34.750668-0.269282l320.722863-325.740925 0 798.397108c0 13.5716 11.001648 24.573248 24.573248 24.573248 13.5716 0 24.573248-11.001648 24.573248-24.573248L536.230246 135.522485l315.80719 320.551874c9.523157 9.667525 25.084167 9.783224 34.750668 0.259043 9.667525-9.524181 9.784248-25.083143 0.259043-34.750668L552.305246 81.813557c-11.058985-11.331339-25.865391-17.688643-41.702849-17.905707-0.277473-0.004096-0.554946-0.005119-0.832419-0.005119-15.559985 0-30.237381 5.957989-41.412066 16.831651-0.124914 0.121842-0.249828 0.245732-0.372694 0.370646L131.339914 423.017198z"
                p-id="2232" fill="#cdcdcd"></path>
            </svg>
          </div>
        }
      </div>
    </div>
  )
}