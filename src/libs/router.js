import {Observable} from './model'
import Mapper from 'url-mapper'

const urlMapper = Mapper()

let router = (routes) => loc  => {
    var matchedRoute = urlMapper.map(loc,routes)
    return (matchedRoute)
}


module.exports = {
    router: router
}