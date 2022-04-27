import './Article.scss'
import Header from "../../components/header/header";
import {useState, useEffect} from "react";
import {dateFormat, http} from "../../utils/common";
import config from "../../config";

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
      <div className='body-ctn'>
        <Header/>
        <div className="container">
          <div className="wrapper">
            <article>
              <header>
                <div className="title">
                  {article.title}
                </div>
                <div className="date-ctn">
                  <span className="date">{date(article.updateTime)}</span>
                </div>
              </header>
              <section
                className={article.isMarkdownEditor ? 'content markdown-body' : 'content'}
                dangerouslySetInnerHTML={{__html: article.htmlContent}}
              />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}