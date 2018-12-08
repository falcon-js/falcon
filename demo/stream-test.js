const stream = require('../src/es/stream')
const scan = require('../src/es/stream') 
var update = stream();
let x = stream()
let y = stream()


var models = scan(function(model, value) {
    return model + value;
  }, 0, update);
x.map( (value) =>  {
    model = value;
    console.log(model)
  });

  y.map( (value) =>  {
    model = value;
    console.log(model)
  });
x(2)
x(5)
y('abc')
