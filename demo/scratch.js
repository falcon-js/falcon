<<<<<<< HEAD
import {patch, h, AutoRender, Render, Init} from '../src'

import {map, stream} from 'flyd'
=======
import {patch, h, Model, AutoRender, Render, Init, diff} from '../src'
import {scan, stream} from 'flyd'
// import {stream} from '../src/es/stream'
>>>>>>> b208a5c2b80330149586b079d6a80deffc0a5180

// let init = {
//   name: 'John'
// }

// let xs = stream()
// console.log(xs())

//console.log(document.getElementById('root'))


<<<<<<< HEAD
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
=======
// let DisplayPanel =(
//   <div style="color:red"> </div>
// )
>>>>>>> b208a5c2b80330149586b079d6a80deffc0a5180

// let InputArea = (props) =>{
//   let action  = (e)=> {
//     Model({name:e.target.value})
//   }
//   return (<input value={props.name} onkeyup={action}/>)
// }

// let updateRange = (val)=>{

<<<<<<< HEAD
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
=======
// }
// let App = ()=> {
//   let   model = Model() || {}
//   console.log('going here', model)
//   return(
//   <div>
//     <div>Input here</div>
//     <InputArea name={''}/>
//     <input type="range" value= {model.name} onchange={(e)=>{
//       let val = e.target.value
//       Model({name: val })}} />
//     <DisplayPanel>{model.name}</DisplayPanel>
//   </div>
// )}

//Init(document.getElementById('root'), App)

// AutoRender(true)
// //Render(View(init))
// Model(init)
// //Part of system
// Model().name = 'John'


let node
//let count = 0

const view = count =>{
  console.log(count)
  let x = count.toString()
  return(
    <div>
      <h1 data={count}>Counter:{count}</h1>
      <button  onclick={() => render(count = count - 1)} >-</button>
      <button  onclick={() => render(count = count + 1)} >+</button>
    </div>
  )
}

const app = (view, container, node) => state => {
  if(node != undefined){
    console.log('normal', diff(view(state), node))
    console.log(view(state),node)
    node = patch(container, view(state), node ) 
  }else{
    console.log('init render')
    node = patch(container, view(state) )
  }
  
}

const render = app(view, document.getElementById('root') )

render(0)

// patch(document.getElementById('root'), view(1) )
>>>>>>> b208a5c2b80330149586b079d6a80deffc0a5180
