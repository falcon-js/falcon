# Falcon Front-end Web development Framework

<img src="https://github.com/falcon-js/falconjs-logos/raw/master/png/FALCONJS-LOGO-992FFF.png" width="300" align="center">

![](https://img.shields.io/apm/l/vim-mode.svg?style=popout-square)
[![](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/@falconjs.io/falcon)




Functional Progressive Web Application framework. That has all the basics, like state management and routing.

The aim of this framework is to aid web developers to focus on the front-end development not needing so much of a tweak.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

- via npm
   -  ```npm install --save @falconjs.io/falcon```

- via yarn
    - ```yarn add @falconjs.io/falcon ```

### For the  TL;DR people read this portion :P
  You can Clone the boilerplate :)!
  - ```git clone https://github.com/jmdisuanco/falconjs.io-boilerplate.git``` [BOILERPLATE](https://github.com/jmdisuanco/falconjs.io-boilerplate.git)
  - ```npm install```
  - ```npm start```
  - browser will open up the Boilerplate App
  - edit the files inside ```src``` folder


## Usage


### Stateless

```js
import {h, Render} from '@falconjs.io/falcon'

const view = count =>
  h("div", {}, [
    h("h1", {}, count),
    h("button", { onclick: () => render(count - 1) }, "-"),
    h("button", { onclick: () => render(count + 1) }, "+")
  ])

const render = Render(view, document.body)

render(0)
```

### with State and JSX

```js
import {h, Render, Observable} from '@falconjs.io/falcon'

let StateStore = {
        data: {
            fName: 'FalconJS',
            lName: 'Framework',
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

let App = new Observable(StateStore)

let Display = () => {
    return(
      <div onupdate={console.log('Display Component has been updated')}>
        <h1>{App.state.fullName}</h1>
        <div>{App.state.age}</div>
        <div>{App.state.old}</div>
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
    
const render = Render(View, document.getElementById('root'))

render(App)
App.observe('fName', () =>{render(App)} )
App.observe('lName', () =>{render(App)} )
App.observe('age', () =>{render(App)} )

```

### working with Routes

```js
import {h, Render, Observable, Router, Navigate, Utils} from '@falconjs.io/falcon'

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
```


## Prerequisites

What things you need to install the software and how to install them

```
npm i -g parcel-bundler
```


- to use JSX feature

place ```.babelrc``` on your development folder with the contents below

```
{
    "plugins": [
      ["transform-react-jsx", {
        "pragma": "h"
      }]
    ]
}
```


### Installing 

clone a copy ```git clone https://github.com/jmdisuanco/falcon```


On the cloned directory type in the commands below to start the the development server 
    ``` yarn start ``` or ``` npm start ```

Running this command will also open up your browser to http://localhost:9999

### Components for FalconJS
components will be publish in npm with a prefix of ```falconjs-component``` ex. ```falconjs-component-flexgrid```

- [Flexgrid Component](https://www.npmjs.com/package/falconjs-component-flexgrid)

## Contributions are most welcome
Please Fork and Send Pull Request for the improvement of this library.


## Built With

* [Superfine](https://github.com/jorgebucaran/superfine) - A minimal view layer for creating declarative web user interfaces.
* [url-mapper](https://github.com/cerebral/url-mapper) - The main purpose of url-mapper is to match given URL to one of the routes. 

## Author

* **JM Disuanco** -  :)  - (https://jm.disuan.co)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
