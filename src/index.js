import {patch, h} from 'superfine'
import {Observable} from './libs/model'
import {router, Navigate} from './libs/router'
import * as Utils from './utils'

const Render = (view, container, node) => state => {
    node = patch(node, view(state), container)
}



module.exports = {
    h: h,
    patch: patch,
    Observable: Observable,
    Render: Render,
    Router: router,
    Navigate: Navigate,
    Utils: Utils
}