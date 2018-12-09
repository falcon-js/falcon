import {patch, h, AutoRender, Render, Init} from '../src'

import {map, stream} from 'flyd'

// let vdom // current vdom

//Library

// let update = (root, newDom)=>{
//   if(vdom == undefined){
//     vdom = newDom
//     patch(root, newDom)
//   }
//   if(newDom != vdom){
//     patch(root, newDom, vdom)
//     vdom = newDom
//   }
// }

// let Render = stream()
// map( (x)=>{
//   update(root, x)
// }, Render)

let init = {
  name: 'John'
}


//console.log(document.getElementById('root'))


let DisplayPanel = <div style="color:red"></div> 



let InputArea = (props) =>{
  let action  = (e)=> {
    Model({name:e.target.value})
  }
  return (<input value={props.name} onkeyup={action}/>)
}

// let App = ()=> {
//   let   model = Model() || {}
//   return(
//   <div>
//     <div>Input here</div>
//     <InputArea name={''}/>
//     <input type="range" onchange={(e)=>{Model({name: e.target.value});Render(App()) } }/>
//   </div>
// )}

Init(document.getElementById('root'), App)
// let Model= stream()
// map ( (m)=>{ Render(View(m))},Model)

//Model(init)
// Sample  Implementation

// let root = document.getElementById('root')
//Root = document.getElementById('root')

// let View = (model) => {

//   return(
//     <div>
//       <div>Input here</div>
//       <InputArea name={model.name}/>
//       <DisplayPanel>{model.name}</DisplayPanel>
//     </div>
//   )
// }

const App = props => (
  <a href={props.url}>
    <h1>{props.children}</h1>
  </a>
)
//Render(View(init))
// Model(init)
// AutoRender(false)
// Render(<App url="/">Click Here!</App>)
//Part of system

let Model  = stream()
// const view = count =>
//   h("div", {}, [
//     h("h1", {}, count),
//     h("button", { onclick: () => render(count - 1) }, "-"),
//     h("button", { onclick: () => render(count + 1) }, "+")
//   ])

  // let View = count => (
  //   <div>
  //     <h1>{count}</h1>
  //     <button onclick={() => render(count - 1) }>-</button>
  //     <button onclick={() => render(count + 1) }>+</button>
  //     <App url={'#'}>Click ME</App>
  //   </div>
  // )

let View = count => (
    <div>
      <h1>{count}</h1>
      <div>{count}</div>
      <table>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      <tr><td>{count}</td><td>{count}</td></tr>
      </table>
      <button onclick={() => Model(count - 1) }>-</button>
      <button onclick={() => Model(count + 1) }>+</button>
      <App url={'#'}>Click ME</App>
    </div>
  )
const app = (View, container, node) => Model => {
  node = patch(node, View(Model), container)
}

const render = app(View, document.getElementById('root'))

// render(0)

map (
  (m)=>{
    render(m)
  },
  Model
)
let x = 1
setInterval( ()=>{
  Model(x ++)
},1000)