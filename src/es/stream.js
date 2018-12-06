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

module.exports = stream