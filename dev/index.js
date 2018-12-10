import {h} from '../src'

//Library Proper
let mount = (vdom, target)=>{
    target.appendChild(vdom)
}

let flatten = (children) => {
    let result = children
    let canFlat = true
    children.map(
        (child) =>{
            if(typeof child === 'object'){
                if(child.hasOwnProperty('type')) canFlat = false
            }
        }
    )
   if(canFlat){
       let joined = children.join('')
       result = [joined]
   }
   return result
}

let createElement = (node) => {
    let el
     
     typeof node === 'string'  ? el = document.createTextNode(node)  
        : typeof node.type === 'object' ? el = document.createElement(node.type.type)
        : el = document.createElement(node.type)
         setProps(el, node.props)
         insertChildren(el, flatten(node.children))
    return el
}

let insertChildren = (el, children)=>{
    for(let key in children){
        typeof children[key] === 'string' ? el.textContent = children[key] : el.appendChild(createElement(children[key]))
    }    
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

let addEventListener = (el, event, cb) =>{
    let e = event.substring(2)
    el.addEventListener(e,cb)
}

/**
 * @param {object} el
 * @param {object} props 
 */
let setProps = (el,props) =>{
   for(let key in props){
        if( key.startsWith("on") ){
            addEventListener(el,key,props[key])
        }else if(typeof props[key] ==='boolean'){
            el.setAttribute(key, key)
        }else if(key === 'style'){
            el.setAttribute(key, getStyle(props[key]))
        }else{
            el.setAttribute(key, props[key])
        }
   }
}

var deepDiffMapper = function() {
    return {
        VALUE_CREATED: 'created',
        VALUE_UPDATED: 'updated',
        VALUE_DELETED: 'deleted',
        VALUE_UNCHANGED: 'unchanged',
        map: function(obj1, obj2) {
            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                throw 'Invalid argument. Function given, object expected.';
            }
            if (this.isValue(obj1) || this.isValue(obj2)) {
                return {
                    type: this.compareValues(obj1, obj2),
                    data: (obj1 === undefined) ? obj2 : obj1,
                };
            }

            var diff = {};
            for (var key in obj1) {
                if (this.isFunction(obj1[key])) {
                    continue;
                }

                var value2 = undefined;
                if ('undefined' != typeof(obj2[key])) {
                    value2 = obj2[key];
                }

                diff[key] = this.map(obj1[key], value2);
            }
            for (var key in obj2) {
                if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
                    continue;
                }

                diff[key] = this.map(undefined, obj2[key]);
            }

            return diff;

        },
        compareValues: function(value1, value2) {
            if (value1 === value2) {
                //return this.VALUE_UNCHANGED;
            }
            if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
               //return this.VALUE_UNCHANGED;
            }
            if ('undefined' == typeof(value1)) {
                console.log('created')
                return this.VALUE_CREATED;
                
            }
            if ('undefined' == typeof(value2)) {
        
                console.log('deleted', value1)
                return this.VALUE_DELETED;
            }
            console.log('updated',value1, "v2->",value2)
            return this.VALUE_UPDATED;
        },
        isFunction: function(obj) {
            return {}.toString.apply(obj) === '[object Function]';
        },
        isArray: function(obj) {
            return {}.toString.apply(obj) === '[object Array]';
        },
        isDate: function(obj) {
            return {}.toString.apply(obj) === '[object Date]';
        },
        isObject: function(obj) {
            return {}.toString.apply(obj) === '[object Object]';
        },
        isValue: function(obj) {
            return !this.isObject(obj) && !this.isArray(obj);
        }
    }
}();


let patch = (container, nNode, oNode, index=0) =>{
    console.log(changed(nNode, oNode), nNode, oNode)
    if(!oNode){
        console.log('first init')
        container.appendChild(createElement(nNode))
    }else if (!nNode) {
        console.log('no new')
        container.removeChild(
            container.childNodes[index]
        )
    }else if (changed(nNode, oNode)){
        console.log('it has change')
        container.replaceChild(
            createElement(nNode),
            container.childNodes[index]
        )
    }
}

//test
let sampleData= 'hello!'
//Passed
let Basic = <div id="sample" class="wow">Hello</div>
//Passed
let tree = <div id="sample" class="wow">
                <ol>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three
                        <ul>
                            <li>A</li>
                            <li>B</li>
                        </ul>
                    </li>
                </ol>
            </div>
//Passed
let WithEvent = <button onclick={ ()=> { console.log('clicked')} }> </button>
//Passed
let supertree = <div>
                    <Basic/>
                    <WithEvent>Click me</WithEvent>
                <ol>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ol>
            </div>
//Passed
let withStyle = <div style={{fontSize:'30px'}}>
            <Basic/>
            <WithEvent/>
        <ol>
            <li style={{color:'blue'}}>One</li>
            <li>Two</li>
            <li>Three</li>
        </ol>
    </div>

//Passed
let withDynProps = <div style={{fontSize:'30px'}} data={sampleData} >
            <Basic/>
            <WithEvent>Click Me</WithEvent>
        <ol>
            <li style={{color:'blue'}}>One</li>
            <li>Two</li>
            <li>Three</li>
        </ol>
    </div>

//passed
let Nested = (model)=>{
    return(
        <div>
            <ul>
                <li>Dog</li>
                <li>Cat</li>
                <li>Fish</li>
            </ul>
            <p>Hi {model.name}</p>
            <p>Your age is <span>{model.age}</span></p>
            <WithEvent>Click me {model.age}</WithEvent>
        </div>
    )
}

let Model = {
    name: 'joe',
    age:20
}
let Nested2 = (model)=>{
    return(
        <div>
            <ul>
                <li>Bird</li>
                <li>Cat</li>
                <li>Fish</li>
            </ul>
            <p>Hi {model.name}</p>
            <p>Your age is <span>{model.age}</span></p>
        </div>
    )
}
let target =  document.getElementById('root')

let a = <div>
    <ul>
        <li>1</li>
        <li>2</li>
        <li class="letter">c</li>
    </ul>
</div>
let b = <div>
    <ul>
        <li>1</li>
        <li>2</li>
        <li class="number">3</li>
    </ul>
</div>


let res = deepDiffMapper.map(a,b)
console.log(JSON.stringify(res,null, 4))
