import {patch, h, Model, AutoRender, Render, Init} from '../src'
// import {map, stream} from 'flyd'

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


let DisplayPanel =(
  <div style="color:red"> </div>
)

let InputArea = (props) =>{
  let action  = (e)=> {
    Model({name:e.target.value})
  }
  return (<input value={props.name} onkeyup={action}/>)
}

let App = ()=> {
  let   model = Model() || {}
  console.log('going here', model)
  return(
  <div>
    <div>Input here</div>
    <InputArea name={''}/>
    <DisplayPanel>{model.name}</DisplayPanel>
  </div>
)}

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
AutoRender(true)
//Render(View(init))
Model(init)
//Part of system
Model().name = 'John'


