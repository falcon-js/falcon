# Falcon Front-end Web development Framework

Virtual Dom based framework. That has all the basics, like state management and routing.

The aim of this framework is to aid web developers to focus on the front-end development not needing so much of a tweak.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

- via npm
   -  ```npm install --save @falconjs.io/falcon```

- via yarn
    - ```yarn add @falconjs.io/falcon ```



## Usage


### Stateless

```
import {h, Render} from '@falcon.js/falcon'

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

``` 
import {h, Render, Observable} from '@falcon.js/falcon'

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

## Built With

* [Superfine](https://github.com/jorgebucaran/superfine) - A minimal view layer for creating declarative web user interfaces.

## Author

* **JM Disuanco** -  :)  - (https://jm.disuan.co)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
