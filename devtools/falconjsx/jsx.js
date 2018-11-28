module.export = _jsx = (jsxo) =>{
    let type = jsxo.elementName 
    let props = jsxo.attributes
    let children = jsxo.children
    return {type,props,children}
}
