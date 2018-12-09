let Observable = (dataObj) => {
    let signals = {}
    
    let Dep = {
        target: null,
        subs:{},
        depend (deps,dep){
            if(!deps.includes(this.target)){
                deps.push(this.target)
            }
            if(!Dep.subs[this.target].includes(dep)){
                Dep.subs[this.target].push(dep)
            }
        },
        getValidDeps (deps, key){
            return deps.filter(dep => this.subs[dep].includes(key))
        },
        notifyDeps(deps){
            //deps.forEach(notify)
            deps.map( (sig) => notify(sig))
        }
    }
    
    /**
     * Observe function
     * 
     * @param {*} property 
     * @param {function} cb 
     */
    let observe = (property, cb) => {
        if(!signals[property]) signals[property] = []
        signals[property].push(cb)  
    }

    let autorender = ()=>{
        console.log('rerender')
    }
    
    /**
     * 
     * @param {object} obj 
     * @param {*} key 
     */
    let makeReactive = (obj, key, computeFunc) => {
        let val = obj[key]
        let deps =[]
    
        Object.defineProperty(obj, key,{
            get(){
                if(Dep.target) {
                   
                    Dep.depend(deps,key)
                    }
                    return val       
            },
             set(newVal){
                val = newVal
                deps = Dep.getValidDeps(deps, key)
                Dep.notifyDeps(deps, key)
                notify(key)
                autorender()
                
            }
        })
    }
    
    /**
     * 
     * @param {object} obj 
     */
    let observeData = (obj) =>{
        for (let key in obj){
            if( obj.hasOwnProperty(key)){
                if(typeof obj[key] === 'function'){
                    makeComputed(obj,key, obj[key])
                } else{
                    makeReactive(obj, key)
                }      
            }
        }
    }
    
    let notify = (signal) => {
        if(!signals[signal] || signals[signal].lenght <1) return
         
         signals[signal].forEach( (signalHandler) => signalHandler() )
    }
    
    let makeComputed = (obj, key, computeFunc) =>{
        let cache = null
        let deps = []
        observe(key, ()=>{
            cache = null //clear cache
            deps = Dep.getValidDeps(deps,key)
            Dep.notifyDeps(deps, key)
        })
    
        Object.defineProperty(obj, key, {
    
            get() {
                if(Dep.target) {
                    Dep.depend(deps, key)
                }
                Dep.target = key
    
                if(!cache){
                    Dep.subs[key] =[]
                    cache = computeFunc.call(obj)
                }
                //Clear target context
                Dep.target = null
                return cache
            },
    
            set(){/*Do nothing*/}
        })
    }
    
    let subscribeWatchers = (watchers, context) => {
        for( let key in watchers){
            if(watchers.hasOwnProperty(key)){
                observe(key, watchers[key].bind(context))
            }
        }
    }
    
    observeData(dataObj.data)
    subscribeWatchers(dataObj.watch, dataObj.data)
    
    return {
        state: dataObj.data,
        observe,
        notify
    }
    
    }
    
 module.exports = {
        Observable: Observable
    }