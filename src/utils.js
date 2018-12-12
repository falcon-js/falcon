/**
 * TransForm all links to Router NAvigation Button
 */
let transLink = (App) =>{
    let link = document.querySelectorAll('a')
for ( var key in link){
  if(typeof link[key] === 'object' && link[key].attributes.href.value.charAt(0) ==='/'){
    let url = link[key].attributes.href.value
    link[key].addEventListener('click', (e)=>{
      e.preventDefault()
      App.state.location = url
      history.pushState({}, null, url);
    }) 
  }
}
}

module.exports ={
    transLink: transLink
}