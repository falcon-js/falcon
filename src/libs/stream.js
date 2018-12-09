let stream = () =>  {
  let mapFunctions = []
  let createdStream = (value) => {
    for (let i in mapFunctions) {
      mapFunctions[i](value)
    }
  };
  createdStream.map = (mapFunction) =>{
    let newStream = stream()

    mapFunctions.push( (value) => {
      newStream(mapFunction(value))
    });

    return newStream
  };
  return createdStream
};

let scan = (accumulator, initial, sourceStream) => {
  let newStream = stream(initial)
  let accumulated = initial

  sourceStream.map(function(value) {
    accumulated = accumulator(accumulated, value)
    newStream(accumulated)
  })

  return newStream
};


module.exports = {
  stream: stream(),
  scan: scan
}