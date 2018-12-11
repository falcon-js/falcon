import {h, Render, Observable} from '../src'

let StateStore = {
        data: {
            fName: 'John',
            lName: 'Doe',
            age:25,
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

let routes = {
  '/':{
      component: <div>This is Root</div>,
      auth: false,
  }
} 
let App = new Observable(StateStore)

let Display = () => {
    return(
      <div onupdate={console.log('Display Component has been updated')}>
        <h1>{App.state.fullName}</h1>
        <span>{App.state.old}</span>
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
    
const render = Render(View, document.body)
render(App)
App.observe('fName', () =>{render(App)} )
App.observe('lName', () =>{render(App)} )
App.observe('age', () =>{render(App)} )