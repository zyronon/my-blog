import React, {lazy} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes, useRoutes} from "react-router-dom";
// import {HashRouter, Route} from 'react-keeper'
import Home from './views/home/Home'
import Archive from './views/archive/Archive'
import Article from "./views/article/Article";
import About from "./views/about/About";
import {withCache} from './utils/withCache'

const CacheHome = withCache(Home)

const App = () => {
  return useRoutes([
    {
      path: '/', element: <CacheHome/>,
      children: [{path: ':id', element: <Article/>}],
    },
    {path: '/archive', element: <Archive/>,},
    // {path: '/article', element: <Article/>,},
    {path: '/about', element: <About/>,},
  ])
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/archive" element={<Archive/>}/>
//         <Route path="/article" element={<Article/>}/>
//         <Route path="/about" element={<About/>}/>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// )
