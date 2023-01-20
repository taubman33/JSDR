class velocityGraph {

  constructor (path) {
    this.data = [];
    this.path = path;
    this.title = "";
  }

  scale (val, min, max, gmin, gmax) {
    // algebraic equation for scaling between two ranges
    return parseInt(((val - min) / (max - min)) * (gmax - gmin) + gmin);
  }

  display (title) {
    this.title = title;
    this.header = document.createElement('header');
    this.header.innerHTML = `<h1>
                              ${this.title}
                            </h1>`;
    document.body.appendChild(this.header);
  }

  fetch () {

    var xhr = new XMLHttpRequest();
    var res,
        path = this.path;

    return new Promise( (resolve, reject) => {

      // opens the request and sets headers
      xhr.open('GET', path);

      // handle changes in the response.
      xhr.onreadystatechange = () => {
        // if the response is ready
        if (xhr.readyState == 4) {
          // if the response returns 200 OK
          if (xhr.status === 200) {
            res = JSON.parse(xhr.responseText);
            // resolve
            this.display( res.title );
            resolve(res.data);
          }
        }
      };

      xhr.send();

    }); // end Promise

  }

}

export { velocityGraph }
