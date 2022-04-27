import Header from "../../components/header/header";
import {useCallback, useEffect, useState} from "react";
import {dateFormat, http} from "../../utils/common";
import './Home.scss'
import config from "../../config";
import {Link} from "react-router-dom";

export default function Home() {

  let [articles, setArticles] = useState([])

  function date(v) {
    return dateFormat(v * 1000, 'yyyy-MM-dd')
  }

  async function getData() {
    let [ok, res] = await http(config.apiUrl + 'v1/article/select?limit=100000&offset=1')
    if (ok) {
      setArticles(res.data.list)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id='home'>
      <Header/>
      <section>
        <div className="border-decorate-a">
          <div className="border-decorate-b">
            <div className="border-decorate-c">
              <h2 className="notice">博客文章</h2>
              <div className="post-wrapper">
                <ul className="post-list" id="post-list">
                  {articles.map((item, index) => {
                    return (
                      <li className="post-list-item" key={index}>
                        <article id="post-你不需要jQuery" className="">
                          <h3 className="post-title">
                            <Link to={'/article?id=' + item.id}>{item.title}</Link>
                          </h3>
                          <div className="post-content">
                            {item.summary}
                          </div>
                          <div className="post-footer">
                            <ul className="article-tag-list">
                              {item.tags.map((tag, tIndex) => {
                                return (<li className="article-tag-list-item"
                                            key={tIndex}
                                            style={{background: 'rgb(236, 209, 137)'}}>
                                  <a className="article-tag-list-link">{tag.name}</a>
                                </li>)
                              })}
                            </ul>
                            <div className="post-meta">
                              <time className="post-time">{date(item.updateTime)}
                              </time>
                            </div>
                          </div>
                        </article>
                      </li>)
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>)
}