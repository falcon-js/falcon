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


Model(init)


// Sample  Implementation

let root = document.getElementById('root')

let DisplayPanel = (props) =>(
  <div style="color:red">{props.name}</div>
)

let InputArea = (props) =>{
  let action  = (e)=> {
    Model({name:e.target.value})
  }
  return (<input value={props.name} onkeyup={action}/>)

}
  
let View = (props) => {
  console.log('triggered')
 let model =  Model()
 console.log(model)
  return(
    <div>
      <DisplayPanel name={model.name}/>
      <div>Input here</div>
      <InputArea name={model.name} />
    </div>
  )
}

let a = (<ul>
    <li>a</li>
    <li>b</li>
    <li>3</li>
  </ul>)

let b = (<ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>)
//Render(<View name={'John'} />)

//Render(<View name={'Martin'}/>)



map ( (m)=>{
  console.log('auto rendering')  
  Render(<View name={m.name}/>)
},Model)