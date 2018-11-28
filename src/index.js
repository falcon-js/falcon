let h = (type, props, ...children) => {
     return { type, props, children }
}


let createElement = (node) => {
  if(typeof node.type === 'object') {
    node = node.type
  }
  if (typeof node === 'string') {
    return document.createTextNode(node)
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

let remAttr= ($el, name, value) => {
    if( name.startsWith("on") ){
        removeEventListener($el,name ,value)
     }else if (name =='style'){
         $el.removeAttribute(name,getStyle(value))
     }else{
         $el.removeAttribute(name, value)
     }
}

let setAttr= ($el, name, value) => {
    if( name.startsWith("on") ){
        addEventListener($el,name ,value)
     }else if (name =='style'){
         $el.setAttribute(name,getStyle(value))
     }else{
         $el.setAttribute(name, value)
     }
}


let diff = (node1, node2) => {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

function updateAttr($target, name, newVal, oldVal) {
    if (!newVal) {
      removeAttr($target, name, oldVal)
    } else if (!oldVal || newVal !== oldVal) {
      setAttr($target, name, newVal)
    }
}

function updateAttrs($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
      updateAttr($target, name, newProps[name], oldProps[name]);
    });
  }

function patch($parent,newNode, oldNode, index = 0) {
  console.log(diff(newNode, oldNode))
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
  } else if (newNode.type) {
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
  patch: patch
}