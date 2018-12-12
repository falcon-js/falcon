import {h, Render, Observable, Router, Navigate, Utils} from '../src'

//location : window.location.pathname This line make sure FalconJS. will serve the right component base on the initial browser access
let StateStore = {
        data: {
            seconds:'',
            location : window.location.pathname,
            routes:{},
            router(){ return Router(this.routes) },
            render:null
        }
}

let App = new Observable(StateStore)

//COMPONENTS
let View  = (Component) => {
      return(
        <div>
          <Header/>
          <Component/>
        </div>
      )
} 
let Header = () =>{
  return(<div><a href="/">Home</a> <a href="/1">One</a> <a href="/2">Two</a> <a href="/3">Three</a> <a href="https://falconjs.io"> Will go to external site</a>  <a href="/4">Not Found</a></div>)
}


let Home =() => { return(<div><h1>Home</h1></div>)}
let noPageFound = ()=> {return(<div><h1>404</h1></div>)}
let One = () => {return(<div><h1>One!</h1></div>)}     
let Two = () => {return(<div><h1>Two!</h1></div>)}     
let Three = () => {return(<div><h1>Three!</h1></div>)}  

//Load Renderer in App state
App.state.render = Render(View, document.getElementById('root'))

//Load route rules to state
App.state.routes = {
  '/': Home,
  '/1': One,
  '/2': Two,
  '/3': Three,
  '*': noPageFound
}

//initial navigation
Navigate(App)

//Utils Helper to transform all <a> Anchor tags that starts with "/" to activate Navigation otherwise it will perform the default method
Utils.transLink(App)
App.observe('location', () =>{Navigate(App)} )