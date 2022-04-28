import './Archive.scss'
import Header from "../../components/header/Header";
import {useState, useEffect} from "react";
import {dateFormat, http} from "../../utils/common";
import config from "../../config";
import {Link} from "react-router-dom";
import Wrapper from "../../components/wrapper/Wrapper";

export default function Archive() {
  let [list, setList] = useState([])

  function date(v, type = 'yyyy-MM-dd') {
    return dateFormat(v * 1000, type)
  }

  async function getData() {
    let [ok, res] = await http(config.apiUrl + 'v1/article/archive')
    if (ok) {
      setList(res.data)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div id='archive'>
      <Header/>
      <Wrapper>
        <h2 className="notice">归档</h2>
        <div className="archive">
          <ul className="archive-list">
            {Object.keys(list).map((key, index) => {
              return (
                <li className="archive-item" key={index}>
                  <div className="year">{key.substr(1)}</div>
                  <ul className="article-list">
                    {list[key].map((article) => {
                      return (<li className="article-item" key={article.id}>
                        <div className="date">{date(article.updateTime, 'MM-dd')}</div>
                        <Link className="article" to={'/article?id=' + article.id}>{article.title}</Link>
                      </li>)
                    })}
                  </ul>
                </li>)
            })}
          </ul>
        </div>
      </Wrapper>
    </div>
  )
}