import {h, Render, Observable, Router} from '../src'

let StateStore = {
        data: {
            fName: 'John',
            lName: 'Doe',
            age:25,
            location : '/',
            fullName () {
                    return this.fName + ' ' + this.lName
                },
            old () {
                let oldornot='Young'
                if(this.age > 50){
                    oldornot = 'Old'
                }
                return oldornot
            }
        }
}

let App = new Observable(StateStore)

let Display = () => {
    return(
      <div onupdate={console.log('Display Component has been updated')}>
        <h1>{App.state.fullName}</h1>
        <div>{App.state.age}</div>
        <div>{App.state.old}</div>
        <a href="/">Home</a>
        <a href="/bar">Display only</a>
        <a href="/blahblah">404</a>
      </div>     
    )
}

 
let Controller = () =>{      
      return(
        <div >
          <input value = {App.state.fName} oninput={(e)=>{App.state.fName = e.target.value }}></input>
          <input value = {App.state.lName} oninput={(e)=>{App.state.lName = e.target.value }}></input>
          <input type='range' value={App.state.age}  oninput={(e)=>{App.state.age = e.target.value }} ></input>
        </div>
      )
}

let View  = (Component) => {
      return(
        <div>
          <Component/>
        </div>
      )
} 
let Home =() => { return(<div><Display/><Controller/></div>)}
let noPageFound = ()=> {console.log('404');return(<div><h1>404</h1></div>)}
    
const render = Render(View, document.getElementById('root'))

const routes = {
  '/': Home,
  '/bar': Controller,
  '*': noPageFound
}
let router = Router(routes)


let reroute = (loc) =>{
let route = router(App.state.location)
 let hm= Router(loc)
 console.log('loc',loc)
  if(route){
    let Component = route.match
    let props = route.values
    console.log('reroute')
    render(Component)
  }
}
 reroute('/bar') 
App.observe('fName', () =>{render()} )
App.observe('lName', () =>{render()} )
App.observe('age', () =>{render()} )
App.observe('location', ()=>{reroute(App.state.location)})


// window.onpopstate = () =>{
//   console.log('not working')
//   console.log(document.location.hash.substring(1))
// }

// window.onpopstate = function(event) {
//   router = Router(['/', routes])
//   console.log("location: pop" + document.location + ", state: " + JSON.stringify(event.state));
// };

let link = document.querySelectorAll('a')
for ( var key in link){
  if(typeof link[key] === 'object'){
    let url = link[key].attributes.href.value
    link[key].addEventListener('click', (e)=>{
      e.preventDefault()
      App.state.location = url
      history.pushState({}, null, url);
    }) 
  }
  
}