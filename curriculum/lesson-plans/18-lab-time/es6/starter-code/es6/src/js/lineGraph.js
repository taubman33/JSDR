var lineGraph = function (canvas, model) {

    this.path = model;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.step;
    this.frame = 0;
    this.x = 0;
    this.y = parseInt(canvas.getAttribute('height'));
    this.padding;
    this.height = canvas.getAttribute('height');
    this.width = canvas.getAttribute('width');

};

// Inherit the prototype of the velocityGraph.
// Now use this.fetch() and this.scale().
lineGraph.prototype = velocityGraph.prototype;

lineGraph.prototype.draw = function () {

  this.fetch().then(function(data){

    // Configure the default stroke width.
    this.context.lineWidth = 2;

    // Change the padding between each point to be
    // evenly spaced for the width of the container.

    this.padding = this.width / data.length;


    // The function callback for requestAnimationFrame.

    this.step = function(time) {

      // To simplify animation, rather than use timestamp, use frames
      // If the frame count is less than the length of the data Array,
      // draw a new segment and request a new frame. This is optimal
      // so requestAnimationFrame doesnt keep counting after the animation.

      if(this.frame < data.length) {

        // To make the graph animate and change color,
        // break the graph into separate paths (`beginPath` and `closePath`)
        // for each data point (data[frame])

        this.context.beginPath();

        // strokeStyle colors the line segment.
        // A common problem in data viz is taking an input value
        // and scaling it to work with styling and positioning.
        // hsl is used to style the graph from red at the lowest value (156)
        // to green at it's highest value (360). Since the values from the JSON
        // are in a range from 0-1000, convert them to fit with the provided scale function.

        this.context.strokeStyle = 'hsl('+this.scale(data[this.frame][1], 0, 1000, 360, 156)+',100%,40%)';


        if(this.frame === 0) {
          this.x = data[this.frame][0];
          this.y = data[this.frame][1];
        }

        // Move to the point the line segment begins
        this.context.moveTo(this.x, this.y);

        // Change the x value so the next point moves right on the graph
        this.x = this.x += this.padding;

        // Change the y value so the next point represents the value from the data
        // Convert the value `data[frame]` to work in a range that is 0-height.
        // Subtract that value from the height so the graph goes from bottom to top.
        this.y = this.height - this.scale(data[this.frame], 0, 1000, 0, this.height);

        // Draw the line to the next x, y coordinate.
        this.context.lineTo(this.x, this.y);

        // Close the line segment. In other words, contain the `strokeStyle`
        // and animation at this particular frame to just this segment

        this.context.closePath();

        // stroke the line.
        this.context.stroke();

        // count up in frames
        this.frame++;

        window.requestAnimationFrame(this.step.bind(this));

      }


    };

    // Call requestAnimationFrame the first time and
    // pass the step function as a callback.

    window.requestAnimationFrame(this.step.bind(this));


  }.bind(this));
};
