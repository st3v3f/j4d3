

// Require submodules.
var graph = require('./j4d3.graph.js');



// Export anonymous library API object.
module.exports = function(){

  // Return the J4d3 library object - this is the API.
  return {
    Graph: graph // E.g., var graph = new J4d3.Graph("#graph", options);

  };

}();
