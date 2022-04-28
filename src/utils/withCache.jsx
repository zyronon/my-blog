// Freeze 是利用 Suspense 把组件 display: none; 了而已
import {Freeze} from 'react-freeze'
import {useOutlet} from "react-router-dom";

export const Cache = (props) => {
  // useOutlet 会返回匹配到的下级页面，如果 element !== null，那说明访问到了 Detail 页面， List 就可以收起来了
  const element = useOutlet()
  // console.log('element',element)
  // console.log('props',props)
  const freeze = !!element
  return (
    <>
      <Freeze freeze={freeze}>{props.children}</Freeze>
      {element}
    </>
  )
}

export function withCache(Component) {
  return (props) => (
    <Cache>
      <Component {...props} />
    </Cache>
  )
}
