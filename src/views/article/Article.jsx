import './Article.scss'
import Header from "../../components/header/Header";
import {useState, useEffect} from "react";
import {dateFormat, http} from "../../utils/common";
import config from "../../config";
import Loading from "../../components/loading/Loading";


export default function Article() {
  let [article, setArticle] = useState({})

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
  }, [])

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
      </div>
    </div>
  )
}