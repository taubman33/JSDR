var velocityGraph = function(path) {
  this.data = [];
  this.path = path;
};

velocityGraph.prototype = {

  scale: function(val, min, max, gmin, gmax) {
    // algebraic equation for scaling between two ranges
    return parseInt(((val - min) / (max - min)) * (gmax - gmin) + gmin);
  },

  fetch: function() {

    var xhr = new XMLHttpRequest();
    var res,
        path = this.path;

    return new Promise(function(resolve, reject) {

      // opens the request and sets headers
      xhr.open('GET', path);

      // handle changes in the response.
      xhr.onreadystatechange = function() {
        // if the response is ready
        if (xhr.readyState == 4) {
          // if the response returns 200 OK
          if (xhr.status === 200) {
            res = JSON.parse(xhr.responseText);
            // resolve
            resolve(res.data);
          }
        }
      };

      xhr.send();

    }); // end Promise

  }

};
