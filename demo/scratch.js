import {patch, h, Model, AutoRender, Render, Init, diff} from '../src'
import {scan, stream} from 'flyd'
// import {stream} from '../src/es/stream'

// let init = {
//   name: 'John'
// }

// let xs = stream()
// console.log(xs())

//console.log(document.getElementById('root'))


// let DisplayPanel =(
//   <div style="color:red"> </div>
// )

// let InputArea = (props) =>{
//   let action  = (e)=> {
//     Model({name:e.target.value})
//   }
//   return (<input value={props.name} onkeyup={action}/>)
// }

// let updateRange = (val)=>{

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