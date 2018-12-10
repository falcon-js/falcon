let h = (type, props, ...children) => {
     return { type, props: props || {}, children}
}

module.exports = {
    h: h
}