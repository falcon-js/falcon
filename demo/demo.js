import {h, Render, Observable, Router} from '../src'

let StateStore = {
        data: {
            fName: 'John',
            lName: 'Doe',
            age:25,
            path : document.location.hash.substring(1),
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
        <a href="/bar">View</a>
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

let View = ()  => {
      return(
        <div>
         <Display/>
         <Controller/>
        </div>
      )
} 

let noPageFound = <div><h1>404</h1></div>
    
const render = Render(View, document.getElementById('root'))

const routes = {
  '/': View,
  '/bar': Display,
  '*': noPageFound
}
let router = Router(routes)
let route = router('/bar')
if(route){
  let Component = route.match
  let props = route.values
  console.log(route)
  let routeRender = Render(Component, document.getElementById('root'))
  routeRender()
}

App.observe('fName', () =>{render(App)} )
App.observe('lName', () =>{render(App)} )
App.observe('age', () =>{render(App)} )
App.observe('path', () =>{console.log(window.location)} )

// window.onpopstate = () =>{
//   console.log('not working')
//   console.log(document.location.hash.substring(1))
// }

window.onpopstate = function(event) {
  router = Router(['/', routes])
  console.log("location: pop" + document.location + ", state: " + JSON.stringify(event.state));
};
let link = document.querySelectorAll('a')
for ( var key in link){
  if(typeof link[key] === 'object'){
    let url = console.log(link[key].attributes.href)
    link[key].addEventListener('click', (e)=>{
      e.preventDefault()
      console.log('clcick')
      
      history.pushState({}, "title 1", "?page=1");
    }) 
  }
  
}