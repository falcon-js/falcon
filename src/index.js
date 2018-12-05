import {stream, map} from 'flyd'

let h = (type, props, ...children) => {
     return { type, props: props || {}, children }
}

let vdom
let Root
let App
let Init =(dom, app) =>{
  Root = dom
  App = app
}

let update = (Root, newDom)=>{
  if(vdom == undefined){
    vdom = newDom
    patch(Root, newDom)
  }
  if(newDom != vdom){
    patch(Root, newDom, vdom)
    vdom = newDom
  }
}

let Model = stream()

let Render = stream()
map( (x)=>{
  update(Root, x)
}, Render)

let AutoRender = (option = true) => {
  if (option === true) map ( (m)=>{ 
    Render(App())
  }, Model)
}


let createElement = (node) => {
  if(node.type != undefined){
    if(typeof node.type === 'object') {
      node = node.type
    }
  }
  
  if (typeof node === 'string') {
     return document.createTextNode(node)
    //return document.innerText = node
  }
 if (typeof node.type =='function'){
   node = node.type(node.props)
 }
  const $el = typeof node.type == 'string'? document.createElement(node.type) : document.createElement(node.type)
 
  
  if(node.props != undefined || node.props != null){
    Object.entries(node.props).map( (p) => {setAttrs($el, p)})
  }
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el))
  return $el;
}

let objecttoInlineStyle = (o) =>{
    let inline =''
    Object.entries(o).map( (s)=>{
        inline += s[0].replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()+':'+s[1]+';'
    })
    return inline
}

let getStyle = (style) =>{
    let inlineStyle = ''
    if (typeof style === 'string'){
        inlineStyle =  style
    }else {
        inlineStyle = objecttoInlineStyle(style)
    }
    return inlineStyle
}

let addEventListener = ( $el, event, cb) =>{
    let e = event.substring(2)
    $el.addEventListener(e,cb)
}

let setAttrs= ($el, prop) => {
    if( prop[0].startsWith("on") ){
       addEventListener($el,prop[0],prop[1])
    }else if (prop[0] =='style'){
        $el.setAttribute(prop[0],getStyle(prop[1]))
    }else{
        $el.setAttribute(prop[0], prop[1])
    }
}

let removeAttr= ($el, name, value) => {
    if( name.startsWith("on") ){
        removeEventListener($el,name ,value)
     }else if (name =='style'){
         $el.removeAttribute(name,getStyle(value))
     }else if (typeof value === 'boolean') {
      removeBooleanProp($target, name)
     }else{
         $el.removeAttribute(name, value)
     }
}

let setAttr= ($el, name, value) => {
  console.log("SetAttr")
    if( name.startsWith("on") ){
        addEventListener($el,name ,value)
     }else{
         $el.setAttribute(name, value)
     }
}


let diff = (node1, node2) => {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

let updateAttr = ($target, name, newVal, oldVal) => {
    if (!newVal) {
      removeAttr($target, name, oldVal)
    } else if (!oldVal || newVal !== oldVal) {
      setAttr($target, name, newVal)
    }
}

let updateAttrs = ($target, newProps, oldProps = {}) => {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
      updateAttr($target, name, newProps[name], oldProps[name]);
    });
  }

  
let patch = ($parent,newNode, oldNode, index = 0) => {
  if (!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (diff(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    )
    }else if (newNode.type) {
    updateAttrs(
        $parent.childNodes[index],
        newNode.props,
        oldNode.props
      )
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      patch(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

module.exports = {
  h: h,
  patch: patch,
  diff: diff,
  Init : Init,
  Render: Render,
  Model: Model,
  AutoRender: AutoRender
}
