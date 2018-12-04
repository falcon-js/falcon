import {patch, h, diff} from '../src'
import {map, stream} from 'flyd'

let vdom // current vdom

//Library

let update = (root, newDom)=>{
  if(vdom == undefined){
    vdom = newDom
    patch(root, newDom)
  }
  if(newDom != vdom){
    patch(root, newDom, vdom)
    vdom = newDom
  }
}

let Render = stream()
map( (x)=>{
  update(root, x)
}, Render)

let init = {
  name: 'John'
}

let Model= stream()
map ( (m)=>{ Render(View(m))},Model)





// Sample  Implementation

let root = document.getElementById('root')

let DisplayPanel =(
  <div style="color:red"> </div>
)

let InputArea = (props) =>{
  let action  = (e)=> {
    Model({name:e.target.value})
  }
  return (<input value={props.name} onkeyup={action}/>)

}
  
let View = (model) => {

  return(
    <div>
      
      <div>Input here</div>
      <InputArea name={model.name} />
      <DisplayPanel>{model.name}</DisplayPanel>
    </div>
  )
}
Render(View(init))
//Model(init)
//Part of system


