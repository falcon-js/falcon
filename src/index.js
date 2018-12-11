import {patch, h} from 'superfine'
import {Observable} from './libs/model'
import {router} from './libs/router'

const Render = (view, container, node) => state => {
    node = patch(node, view(state), container)
}



module.exports = {
    h: h,
    patch: patch,
    Observable: Observable,
    Render: Render,
    Router: router
}