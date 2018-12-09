//import {patch, h} from '../src'
import {patch, h} from 'superfine'
import {Observable} from '../src/libs/model'


/**
 * 
 * Stateless Demo
 * 
 */


 
// const view = count =>
//   h("div", {}, [
//     h("h1", {}, count),
//     h("button", { onclick: () => render(count - 1) }, "-"),
//     h("button", { onclick: () => render(count + 1) }, "+")
//   ])

const view = count => {
  return <div>
          <h1>Counter: {count}</h1>
          <button  onclick={() => render(count = count - 1)} >-</button>
          <button  onclick={() => render(count = count + 1)} >+</button>
        </div>
}


// const app = (view, container, node) => state => {
//   node = patch(node, view(state), container)
// }

// const render = app(view, document.body)

// render(0)

// let App = Render(view, document.getElementById('root'))
// App(0)


// const view = count =>
//   h("div", {}, [
//     h("h1", {}, count),
//     h("button", { onclick: () => render(count - 1) }, "-"),
//     h("button", { onclick: () => render(count + 1) }, "+")
//   ])



   let State = {
        data: {
            fName: 'John',
            lName: 'Martin',
            age:25,
            fullName () {
                    return this.fName + ' ' + this.lName
                },
            old () {
                let oldornot='Young'
                if(this.age > 50){
                    oldornot = 'old'
                }
                return oldornot
            }
        }
    }
    let App = new Observable(State)

    let Display = () => {
    return(
      <div onupdate={console.log('updated!')}>
        <h1 style={{fontSize:App.state.age +'px'}}>{App.state.fullName}</h1>
        <span>{App.state.old}</span>
      </div>     
    )
                  }
    
    let Controller = () =>{
      
      return(
        <div >
          <input value = {App.state.fName} oninput={(e)=>{App.state.fName = e.target.value }}></input>
          <input type='range' value={App.state.age}  oninput={(e)=>{App.state.age = e.target.value }} ></input>
        </div>
      )
    }

    let bioView = App => {
      return(
        <div>
         <Display/>
         <Controller/>
        </div>
      )
    } 
    const app = (bioView, container, node) => state => {
      node = patch(node, bioView(state), container)
    }
    
    const render = app(bioView, document.body)
    
    render(App)

    
    App.observe('fName', () =>{render(App)} )
    App.observe('lName', () =>{render(App)} )
    App.observe('age', () =>{render(App)} )
    App.state.fName = 'John Martin'
    App.state.lName = 'Disuanco'
    window.Update = App
    
    let shouter = () =>{console.log('rerender')}

    console.log(App.notify)