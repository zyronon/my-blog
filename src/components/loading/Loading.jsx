import './Loading.scss'

function Loading() {
  return (
    <div className="loading">
      <div className='child'/>
      <div className='child'/>
      <div className='child'/>
      <div className='child'/>
    </div>
  )
}

export default function WithLoading(props) {
  return (
    <div style={{position: 'relative'}}>
      {props.show && <Loading/>}
      {props.children}
    </div>
  )
}