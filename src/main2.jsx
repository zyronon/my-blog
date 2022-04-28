import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from './views/home/Home'
import Archive from './views/archive/Archive'
import Article from "./views/article/Article";
import About from "./views/about/About";

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/archive" element={<Archive/>}/>
      <Route path="/article" element={<Article/>}/>
      <Route path="/about" element={<About/>}/>
      {/*<CacheRoute path="/" component={<Home/>}/>*/}
      {/*<CacheRoute path="/archive" component={<Archive/>}/>*/}
      {/*<CacheRoute path="/article" component={<Article/>}/>*/}
      {/*<CacheRoute path="/about" component={<About/>}/>*/}
    </Routes>
  </BrowserRouter>
</React.StrictMode>)
