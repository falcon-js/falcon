import {patch, h} from 'superfine'
import {Observable} from './libs/model'

const Render = (view, container, node) => state => {
    node = patch(node, view(state), container)
}



module.exports = {
    h: h,
    patch: patch,
    Observable: Observable,
    Render: Render
}