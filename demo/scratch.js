import {patch, h, diff} from '../src'


const view = count =>{
  console.log(count)
  let x = count.toString()
  return(
    <div>
      <h1 data={count}>Counter,: {count}</h1>
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
