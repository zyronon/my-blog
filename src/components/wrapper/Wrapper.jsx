import './Wrapper.scss'

export default function Wrapper(props) {
  return (
    <div className="container">
      <div className="border-decorate-a">
        <div className="border-decorate-b">
          <div className="border-decorate-c">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}