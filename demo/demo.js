import {patch, h} from '../src'

const dom = document.getElementById('root');

let onClick = () =>{
    let counter = new Date().getSeconds()
    style= {
      fontSize: counter
    }
    let clickcounter =  <p id="target" class='blue' onclick={onClick} style={style}>Hello Loco!</p>
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

let Sample = (
  <div id="SAMPLE">
      <p>Sample!</p>
  </div>
)

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


patch(dom, bare)
patch(dom, bare, bare2)
