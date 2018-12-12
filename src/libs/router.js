import {Observable} from './model'
//import {h} from 'superfine'
import Mapper from 'url-mapper'

const urlMapper = Mapper()

let router = (routes) => loc  => {
    var matchedRoute = urlMapper.map(loc,routes)
    return (matchedRoute)
}

let Navigate = (App) =>{
    let route = App.state.router(App.state.location)
      if(route){
        let Component = route.match
        let props = route.values
        App.state.render(Component)
      }else{
        let Component = App.state.routes['*']
        App.state.render(Component)
      }
    }

module.exports = {
    router: router,
    Navigate: Navigate
}