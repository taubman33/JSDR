(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var lineGraph = require("./js/lineGraph").lineGraph;

var graph = new lineGraph(document.getElementsByTagName("canvas")[0], "/models/data.json");

graph.draw();

console.log(graph);

},{"./js/lineGraph":2}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var key in props) {
      var prop = props[key];prop.configurable = true;if (prop.value) prop.writable = true;
    }Object.defineProperties(target, props);
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _inherits = function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
};

var _classCallCheck = function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var velocityGraph = require("./velocity").velocityGraph;

var lineGraph = (function (_velocityGraph) {
  function lineGraph(canvas, path) {
    _classCallCheck(this, lineGraph);

    this.path = path;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.step;
    this.frame = 0;
    this.x = 0;
    this.y = 0;
    this.padding;
    this.height = canvas.getAttribute("height");
    this.width = canvas.getAttribute("width");
  }

  _inherits(lineGraph, _velocityGraph);

  _createClass(lineGraph, {
    draw: {
      value: function draw() {
        var _this = this;

        this.fetch().then(function (data) {

          // Configure the default stroke width.
          _this.context.lineWidth = 2;

          // Change the padding between each point to be
          // evenly spaced for the width of the container.

          _this.padding = _this.width / data.length;

          // The function callback for requestAnimationFrame.

          _this.step = function (time) {

            // To simplify animation, rather than use timestamp, use frames
            // If the frame count is less than the length of the data Array,
            // draw a new segment and request a new frame. This is optimal
            // so requestAnimationFrame doesnt keep counting after the animation.

            if (_this.frame < data.length) {

              // To make the graph animate and change color,
              // break the graph into separate paths (`beginPath` and `closePath`)
              // for each data point (data[frame])

              _this.context.beginPath();

              // strokeStyle colors the line segment.
              // A common problem in data viz is taking an input value
              // and scaling it to work with styling and positioning.
              // hsl is used to style the graph from red at the lowest value (156)
              // to green at it's highest value (360). Since the values from the JSON
              // are in a range from 0-1000, convert them to fit with the provided scale function.

              _this.context.strokeStyle = "hsl(" + _this.scale(data[_this.frame][1], 0, 1000, 360, 156) + ",100%,40%)";

              // Move to the point the line segment begins
              if (_this.frame === 0) {
                _this.x = data[_this.frame][0];
                _this.y = data[_this.frame][1];
              }

              _this.context.moveTo(_this.x, _this.y);

              // Change the x value so the next point moves right on the graph
              _this.x = data[_this.frame][0];

              // Change the y value so the next point represents the value from the data
              // Convert the value `data[frame]` to work in a range that is 0-height.
              // Subtract that value from the height so the graph goes from bottom to top.
              _this.y = data[_this.frame][1];

              // Draw the line to the next x, y coordinate.
              _this.context.lineTo(_this.x, _this.y);

              // Close the line segment. In other words, contain the `strokeStyle`
              // and animation at this particular frame to just this segment

              _this.context.closePath();

              // stroke the line.
              _this.context.stroke();

              // count up in frames
              _this.frame++;

              window.requestAnimationFrame(_this.step);
            }
          };

          // Call requestAnimationFrame the first time and
          // pass the step function as a callback.

          window.requestAnimationFrame(_this.step);
        });
      }
    }
  });

  return lineGraph;
})(velocityGraph);

exports.lineGraph = lineGraph;

},{"./velocity":3}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var velocityGraph = (function () {
  function velocityGraph(path) {
    _classCallCheck(this, velocityGraph);

    this.data = [];
    this.path = path;
    this.title = "";
  }

  _createClass(velocityGraph, {
    scale: {
      value: function scale(val, min, max, gmin, gmax) {
        // algebraic equation for scaling between two ranges
        return parseInt((val - min) / (max - min) * (gmax - gmin) + gmin);
      }
    },
    display: {
      value: function display(title) {
        this.title = title;
        this.header = document.createElement("header");
        this.header.innerHTML = "<h1>\n                              " + this.title + "\n                            </h1>";
        document.body.appendChild(this.header);
      }
    },
    fetch: {
      value: function fetch() {
        var _this = this;

        var xhr = new XMLHttpRequest();
        var res,
            path = this.path;

        return new Promise(function (resolve, reject) {

          // opens the request and sets headers
          xhr.open("GET", path);

          // handle changes in the response.
          xhr.onreadystatechange = function () {
            // if the response is ready
            if (xhr.readyState == 4) {
              // if the response returns 200 OK
              if (xhr.status === 200) {
                res = JSON.parse(xhr.responseText);
                // resolve
                _this.display(res.title);
                resolve(res.data);
              }
            }
          };

          xhr.send();
        }); // end Promise
      }
    }
  });

  return velocityGraph;
})();

exports.velocityGraph = velocityGraph;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvTGlicmFyeS9XZWJTZXJ2ZXIvRG9jdW1lbnRzL0pTX01hdGVyaWFscy9jdXJyaWN1bHVtL2xlc3Nvbi1wbGFucy8xOC1sYWItdGltZS9zb2x1dGlvbi9lczYvc3JjL2FwcC5qcyIsIi9MaWJyYXJ5L1dlYlNlcnZlci9Eb2N1bWVudHMvSlNfTWF0ZXJpYWxzL2N1cnJpY3VsdW0vbGVzc29uLXBsYW5zLzE4LWxhYi10aW1lL3NvbHV0aW9uL2VzNi9zcmMvanMvbGluZUdyYXBoLmpzIiwiL0xpYnJhcnkvV2ViU2VydmVyL0RvY3VtZW50cy9KU19NYXRlcmlhbHMvY3VycmljdWx1bS9sZXNzb24tcGxhbnMvMTgtbGFiLXRpbWUvc29sdXRpb24vZXM2L3NyYy9qcy92ZWxvY2l0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUZRLFNBQVMsR0FBQSxPQUFBLENBQU8sZ0JBQWdCLENBQUEsQ0FBaEMsU0FBUyxDQUFBOztBQUVqQixJQUFJLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7QUFFM0YsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUViLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQ05uQixZQUFZLENBQUM7O0FBRWIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQUUsV0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQUUsU0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7QUFBRSxVQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMs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LFlBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQyxZQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsNENBQ08sSUFBSSxDQUFDLEtBQUssd0NBQ1IsQ0FBQztBQUMvQixnQkFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQ3hDOztBQUVELFNBQUs7YUFBQyxpQkFBRzs7O0FBRVAsWUFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUMvQixZQUFJLEdBQUc7WUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFckIsZUFBTyxJQUFJLE9BQU8sQ0FBRSxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7OztBQUd2QyxhQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3RCLGFBQUcsQ0FBQyxrQkFBa0IsR0FBRyxZQUFNOztBQUU3QixnQkFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTs7QUFFdkIsa0JBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7QUFDdEIsbUJBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFbkMsc0JBQUssT0FBTyxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBQztBQUMxQix1QkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztlQUNuQjthQUNGO1dBQ0YsQ0FBQzs7QUFFRixhQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FFWixDQUFDLENBQUM7T0FFSjs7OztTQW5ERyxhQUFhOzs7UUF1RFYsYUFBYSxHQUFiLGFBQWEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtsaW5lR3JhcGh9IGZyb20gJy4vanMvbGluZUdyYXBoJztcblxudmFyIGdyYXBoID0gbmV3IGxpbmVHcmFwaChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnY2FudmFzJylbMF0sICcvbW9kZWxzL2RhdGEuanNvbicpO1xuXG5ncmFwaC5kcmF3KCk7XG5cbmNvbnNvbGUubG9nKGdyYXBoKTtcbiIsImltcG9ydCB7dmVsb2NpdHlHcmFwaH0gZnJvbSAnLi92ZWxvY2l0eSc7XG5cbmNsYXNzIGxpbmVHcmFwaCBleHRlbmRzIHZlbG9jaXR5R3JhcGgge1xuXG4gIGNvbnN0cnVjdG9yIChjYW52YXMsIHBhdGgpIHtcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5zdGVwO1xuICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICB0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKTtcbiAgICB0aGlzLndpZHRoID0gY2FudmFzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKTtcblxuICB9XG5cbiAgZHJhdyAoKSB7XG5cbiAgICB0aGlzLmZldGNoKCkudGhlbiggKGRhdGEpID0+IHtcblxuICAgICAgLy8gQ29uZmlndXJlIHRoZSBkZWZhdWx0IHN0cm9rZSB3aWR0aC5cbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSAyO1xuXG4gICAgICAvLyBDaGFuZ2UgdGhlIHBhZGRpbmcgYmV0d2VlbiBlYWNoIHBvaW50IHRvIGJlXG4gICAgICAvLyBldmVubHkgc3BhY2VkIGZvciB0aGUgd2lkdGggb2YgdGhlIGNvbnRhaW5lci5cblxuICAgICAgdGhpcy5wYWRkaW5nID0gdGhpcy53aWR0aCAvIGRhdGEubGVuZ3RoO1xuXG5cbiAgICAgIC8vIFRoZSBmdW5jdGlvbiBjYWxsYmFjayBmb3IgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxuXG4gICAgICB0aGlzLnN0ZXAgPSAodGltZSkgPT4ge1xuXG4gICAgICAgIC8vIFRvIHNpbXBsaWZ5IGFuaW1hdGlvbiwgcmF0aGVyIHRoYW4gdXNlIHRpbWVzdGFtcCwgdXNlIGZyYW1lc1xuICAgICAgICAvLyBJZiB0aGUgZnJhbWUgY291bnQgaXMgbGVzcyB0aGFuIHRoZSBsZW5ndGggb2YgdGhlIGRhdGEgQXJyYXksXG4gICAgICAgIC8vIGRyYXcgYSBuZXcgc2VnbWVudCBhbmQgcmVxdWVzdCBhIG5ldyBmcmFtZS4gVGhpcyBpcyBvcHRpbWFsXG4gICAgICAgIC8vIHNvIHJlcXVlc3RBbmltYXRpb25GcmFtZSBkb2VzbnQga2VlcCBjb3VudGluZyBhZnRlciB0aGUgYW5pbWF0aW9uLlxuXG4gICAgICAgIGlmKHRoaXMuZnJhbWUgPCBkYXRhLmxlbmd0aCkge1xuXG4gICAgICAgICAgLy8gVG8gbWFrZSB0aGUgZ3JhcGggYW5pbWF0ZSBhbmQgY2hhbmdlIGNvbG9yLFxuICAgICAgICAgIC8vIGJyZWFrIHRoZSBncmFwaCBpbnRvIHNlcGFyYXRlIHBhdGhzIChgYmVnaW5QYXRoYCBhbmQgYGNsb3NlUGF0aGApXG4gICAgICAgICAgLy8gZm9yIGVhY2ggZGF0YSBwb2ludCAoZGF0YVtmcmFtZV0pXG5cbiAgICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgICAvLyBzdHJva2VTdHlsZSBjb2xvcnMgdGhlIGxpbmUgc2VnbWVudC5cbiAgICAgICAgICAvLyBBIGNvbW1vbiBwcm9ibGVtIGluIGRhdGEgdml6IGlzIHRha2luZyBhbiBpbnB1dCB2YWx1ZVxuICAgICAgICAgIC8vIGFuZCBzY2FsaW5nIGl0IHRvIHdvcmsgd2l0aCBzdHlsaW5nIGFuZCBwb3NpdGlvbmluZy5cbiAgICAgICAgICAvLyBoc2wgaXMgdXNlZCB0byBzdHlsZSB0aGUgZ3JhcGggZnJvbSByZWQgYXQgdGhlIGxvd2VzdCB2YWx1ZSAoMTU2KVxuICAgICAgICAgIC8vIHRvIGdyZWVuIGF0IGl0J3MgaGlnaGVzdCB2YWx1ZSAoMzYwKS4gU2luY2UgdGhlIHZhbHVlcyBmcm9tIHRoZSBKU09OXG4gICAgICAgICAgLy8gYXJlIGluIGEgcmFuZ2UgZnJvbSAwLTEwMDAsIGNvbnZlcnQgdGhlbSB0byBmaXQgd2l0aCB0aGUgcHJvdmlkZWQgc2NhbGUgZnVuY3Rpb24uXG5cbiAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSAnaHNsKCcrdGhpcy5zY2FsZShkYXRhW3RoaXMuZnJhbWVdWzFdLCAwLCAxMDAwLCAzNjAsIDE1NikrJywxMDAlLDQwJSknO1xuXG4gICAgICAgICAgLy8gTW92ZSB0byB0aGUgcG9pbnQgdGhlIGxpbmUgc2VnbWVudCBiZWdpbnNcbiAgICAgICAgICBpZih0aGlzLmZyYW1lID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggPSBkYXRhW3RoaXMuZnJhbWVdWzBdO1xuICAgICAgICAgICAgdGhpcy55ID0gZGF0YVt0aGlzLmZyYW1lXVsxXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcblxuXG4gICAgICAgICAgLy8gQ2hhbmdlIHRoZSB4IHZhbHVlIHNvIHRoZSBuZXh0IHBvaW50IG1vdmVzIHJpZ2h0IG9uIHRoZSBncmFwaFxuICAgICAgICAgIHRoaXMueCA9IGRhdGFbdGhpcy5mcmFtZV1bMF07XG5cbiAgICAgICAgICAvLyBDaGFuZ2UgdGhlIHkgdmFsdWUgc28gdGhlIG5leHQgcG9pbnQgcmVwcmVzZW50cyB0aGUgdmFsdWUgZnJvbSB0aGUgZGF0YVxuICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHZhbHVlIGBkYXRhW2ZyYW1lXWAgdG8gd29yayBpbiBhIHJhbmdlIHRoYXQgaXMgMC1oZWlnaHQuXG4gICAgICAgICAgLy8gU3VidHJhY3QgdGhhdCB2YWx1ZSBmcm9tIHRoZSBoZWlnaHQgc28gdGhlIGdyYXBoIGdvZXMgZnJvbSBib3R0b20gdG8gdG9wLlxuICAgICAgICAgIHRoaXMueSA9IGRhdGFbdGhpcy5mcmFtZV1bMV07XG5cbiAgICAgICAgICAvLyBEcmF3IHRoZSBsaW5lIHRvIHRoZSBuZXh0IHgsIHkgY29vcmRpbmF0ZS5cbiAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHRoaXMueCwgdGhpcy55KTtcblxuICAgICAgICAgIC8vIENsb3NlIHRoZSBsaW5lIHNlZ21lbnQuIEluIG90aGVyIHdvcmRzLCBjb250YWluIHRoZSBgc3Ryb2tlU3R5bGVgXG4gICAgICAgICAgLy8gYW5kIGFuaW1hdGlvbiBhdCB0aGlzIHBhcnRpY3VsYXIgZnJhbWUgdG8ganVzdCB0aGlzIHNlZ21lbnRcblxuICAgICAgICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgICAgICAgIC8vIHN0cm9rZSB0aGUgbGluZS5cbiAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAgICAgICAvLyBjb3VudCB1cCBpbiBmcmFtZXNcbiAgICAgICAgICB0aGlzLmZyYW1lKys7XG5cbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc3RlcCk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH07XG5cbiAgICAgIC8vIENhbGwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRoZSBmaXJzdCB0aW1lIGFuZFxuICAgICAgLy8gcGFzcyB0aGUgc3RlcCBmdW5jdGlvbiBhcyBhIGNhbGxiYWNrLlxuXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuc3RlcCk7XG5cblxuICAgIH0pO1xuXG4gIH1cblxufVxuXG5leHBvcnQge2xpbmVHcmFwaH1cbiIsImNsYXNzIHZlbG9jaXR5R3JhcGgge1xuXG4gIGNvbnN0cnVjdG9yIChwYXRoKSB7XG4gICAgdGhpcy5kYXRhID0gW107XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLnRpdGxlID0gXCJcIjtcbiAgfVxuXG4gIHNjYWxlICh2YWwsIG1pbiwgbWF4LCBnbWluLCBnbWF4KSB7XG4gICAgLy8gYWxnZWJyYWljIGVxdWF0aW9uIGZvciBzY2FsaW5nIGJldHdlZW4gdHdvIHJhbmdlc1xuICAgIHJldHVybiBwYXJzZUludCgoKHZhbCAtIG1pbikgLyAobWF4IC0gbWluKSkgKiAoZ21heCAtIGdtaW4pICsgZ21pbik7XG4gIH1cblxuICBkaXNwbGF5ICh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIHRoaXMuaGVhZGVyLmlubmVySFRNTCA9IGA8aDE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9oMT5gO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5oZWFkZXIpO1xuICB9XG5cbiAgZmV0Y2ggKCkge1xuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciByZXMsXG4gICAgICAgIHBhdGggPSB0aGlzLnBhdGg7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgLy8gb3BlbnMgdGhlIHJlcXVlc3QgYW5kIHNldHMgaGVhZGVyc1xuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHBhdGgpO1xuXG4gICAgICAvLyBoYW5kbGUgY2hhbmdlcyBpbiB0aGUgcmVzcG9uc2UuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAvLyBpZiB0aGUgcmVzcG9uc2UgaXMgcmVhZHlcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgcmVzcG9uc2UgcmV0dXJucyAyMDAgT0tcbiAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gcmVzb2x2ZVxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCByZXMudGl0bGUgKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgeGhyLnNlbmQoKTtcblxuICAgIH0pOyAvLyBlbmQgUHJvbWlzZVxuXG4gIH1cblxufVxuXG5leHBvcnQgeyB2ZWxvY2l0eUdyYXBoIH1cbiJdfQ==
