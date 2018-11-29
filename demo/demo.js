import {patch, h} from '../src'
import {stream} from 'flyd'

let oldnode = stream()
//let oldnode
const dom = document.getElementById('root');

let onClick = () =>{
    let counter = new Date().getSeconds()
    style= {
      fontSize: counter
    }
    let clickcounter =  <p id="target" class='blue' onclick={onClick} style={style}>Hello Loco!</p>
    patch(dom,<HelloMessage name={'John!'}/>, Jsx)
}

let style = {
    color: 'Blue',
    fontSize: '11px'
}
let bare = h('div',{id:'Bar' , class:'red dark'},
    h('p',null,'hello!'),
    h('p',null,'John!')
)

let bare2 = h('div',{id:'Bar' , class:'red dark'},
    h('p',null,'hello!'),
    h('p',null,'Joe!')
)

let keyup = (e) =>{
  e.preventDefault()
  e.target.value = e.target.value
  console.log(e)
  let t = document.getElementById('app')
  patch(dom, Sample({Val: e.target.value}), Sample)
}

let DisplayPanel = ({Val}) => <p id="target">{Val}</p>


let Sample = ({Val}) =>{
    console.log(Val)
  return(
  <div id="SAMPLE">
      <p id="label">Sample!</p>
      <DisplayPanel Val={Val}/>
      <input value={Val} placeholder="your name here" onkeyup={ (e) => {keyup(e)} }></input>
  </div>
)}

let Jsx = (
    <div id="JSX">        
        <p class='red' onclick={onClick} style={style}>Hello Loco!</p>
        <p id="target" class='blue' style="color: green; font-size:5" >Hello Loco!</p>
        <p  class='green' >Hello Loco!</p>
    </div>
)



const HelloMessage = ({name}) =>
  <div id="hello">
    {name}
  </div>


  let App =  (<div id="app">
              <Sample Val={''}/>
              <Jsx/>
            </div>)
            


let render = (dom, element) => {
  let res = patch(dom,element, oldnode())
  console.log(res)
}

render(dom, Jsx)

// setInterval(()=>{
//   console.log(oldnode())
// },3000)