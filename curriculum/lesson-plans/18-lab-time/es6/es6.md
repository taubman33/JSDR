# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Lab Time: ECMAScript 6 (1:15)

> Note: This is a lab session where the first portion of class should be spent on revising old material or introducing new JS concepts. An **introduction to ES6** is provided in this lesson plan as an alternate to reviewing old material. In this lesson, students learn a brief history of ECMAScript and install dependencies for starter code. They'll also write two ES6 Classes and extend one from the other, modularize the existing code using ES6 import and export and Convert all instances of function.prototype.bind to lexical scoping. In addition, students will write a method that displays a title for the graph with ES6 template strings. **The remaining time should be spent working on final projects.**

| Timing | Topic | Description |
| --- | --- | --- |
| 10 min | [Opening](#opening) |  Introduction to ECMAScript |
| 20 min | [Codealong](#codealong1) |  ES6 Classes  |
| 15 min | [Codealong](#codealong2) |  ES6 Modules  |
| 10 min | [Codealong](#codealong3) |  Lexical Scope  |
| 20 min | [Lab](#lab1) |  DOM Manipulation & Template Strings   |

## Objectives

_After this lesson, students will be able to:_

*	Understand the idea of classical inheritance and how it applies to ES6.
* Be able to make a codebase modular with import and export statement.
* Be able to use template literals for DOM Manipulation.
* Understand the concept of lexical scope and how it ties back to closures.
* Understand the role of a compiler to use ES6 today.


---

<a name = "opening"></a>
## Introduction to ECMAScript (10 min)

JavaScript was first developed by Brendan Eich while he was working at Netscape in 1995. A couple years later, the language was brought to ECMA so the language could be adopted by other browsers like Internet Explorer. Since the late nineties, ECMAScript has been the standard internet browsers adhere to when supporting the spec. Eventually, after many years of disagreements between several interested parties like Microsoft, Adobe, and Mozilla over the design of the spec, an agreement was made in 2009 on a set of changes to ECMAScript which became ES5. In the summer of 2015, the latest iteration called ES6 was finalized bringing many exciting new features to the language including classes, modules, easier methods for working with templates, block scope, arrow functions, generators, and promises!

Currently most browsers do not support the spec but will provide support over the course of 2016 and 2017. Already in the nightly builds of Firefox and Google Chrome we've seen commitment to supporting parts of ECMAScript 6. Microsoft has pledged to support changes to the spec in Edge 13 and Apple is likely to support major portions of the language in Safari 10.

Here is a good compatibility table: [http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/)

Until browsers can support all the features of the new ES6 spec, libraries like traceur and babel allow developers to write ES6 today and "transpile" back down to ES5 which is compatible with current browsers.

Today we are going to use a [gulp task](https://github.com/thoughtram/es6-6to5-browserify-boilerplate) provided by Christoph Burgdorf to "transpile" ES6 down to ES5. A README.md is available in the starter code.

Open the starter code for today's lesson and install the necessary modules needed for the gulp task to run and review the README.

`gulp watch` will listen for changes in the directory and compile all of the ES6 code into one file `app.js`.  

>Note: It's worth showing the students the project pages for babel and browserify so they can follow up and get a basic understanding of what is going on in the gulp task.

[https://babeljs.io](https://babeljs.io)

[http://browserify.org](https://babeljs.io)


`gulp watch` essentially listens for changes in the directory and "transpile" all of the ES6 code into one file `app.js` that uses common.js modules as opposed to ES6 modules so browsers can interpret the code.


---

<a name = "codealong1"></a>
### ES6 Classes (20 min)

In ECMAScript 6, developers also get access to syntactical sugar over Object.prototype that resembles a classical inheritance model found in other programming languages, but still uses prototypical inheritance found in JavaScript.

Before (w/ constructor function):

```js
var fetchDimensions = function(){
  return [this.getWidth(), this.getHeight()];
};

fetchDimensions.prototype.getWidth = function(){
    return $(window).width();
}

```

After (ES6 Class):

```js
class fetchDimensions {
  constructor() {
    return [this.getWidth(), this.getHeight()];
  },
  getWidth() {
    return $(window).width();
  }
}
```

>Note:
>* Show the students how to convert the constructor and methods in `velocity.js` to use the new ES6 class syntax.
>* Ask the students to convert the constructor and methods in `lineGraph.js` to an ES6 class.
>* Convert each constructor and prototypical method in velocity.js and lineGraph.js to ES6 classes.

velocity.js:

```js
class velocityGraph {

  constructor (path) {
    //code
  }

  scale (val, min, max, gmin, gmax) {
    //code
  }

  display (title) {
    //code
  }

}
```


lineGraph.js:

```js

class lineGraph {

  constructor (canvas, path) {
    //code
  }

  draw () {
    //code
  }

}

```


---

<a name = "codealong2"></a>
## ES6 Modules (15 min)

It's rather cumbersome to rely on the browser to asynchronously load `.js` files. Sometimes dependencies need to load before a function can execute. Typically the workflow is to include one `.js` file before the other on the page. For several years, JavaScript Engineers have relied on third party libraries like require.js and common.js to modularize their code, import and export methods between `.js` files rather than relying on `<script>` tags. With ECMAScript 6, developers get native support for modules that has a much cleaner syntax making libraries like require.js and common.js obsolete.

Before (w/ require.js or common.js):

```js
var $ = require('jquery'); // import jQuery
var fetchWidth = function(){
  return $(window).width();
};
module.exports = fetchWidth; // export a function

```

After (ES6 Modules):

```js
import {$} from 'jquery'; // import jQuery
var fetchWidth = function(){
  return $(window).width();
};
export {fetchWidth}; // export a function

```

* Export the `velocityGraph` class at the last line of velocity.js.

velocity.js:

```js
export { velocityGraph }

```

* Import the `velocityGraph` class into `lineGraph.js` and use it to extend the `lineGraph` class from the `velocityGraph` class.

lineGraph.js:

```js
import {velocityGraph} from './velocity';

class lineGraph extends velocityGraph {
  //code
```

* Export `lineGraph` and import it into `app.js` to make a `new lineGraph()`.

lineGraph.js:

```js
export {lineGraph}
```

app.js:

```js
import {lineGraph} from './js/lineGraph';
```

Finally we have the app working again!
See the characters ES6 drawn on the canvas.

---

<a name = "codealong3"></a>
## Lexical Scope (10 min)

ES6 gives developers greater control over lexical scoping (`function.protoype.bind` and `this`) and a shorthand syntax for passing `this` between functions using `=>` fat arrows.

Before (function.prototype.bind) :

```js

var fn = function(elem){
  this.count = 0;
  elem.addEventListener('click', function(){
    this.count++; // out of scope b/c this = elem
  }.bind(this)); // use bind to insert outer scope
}

```


After ( Using => ) :

```js

var fn = function(elem){
  this.count = 0;
  elem.addEventListener('click', () => {
     this.count++
  });
}

```

>* Note: Ask the students to convert all instances of `function.prototype.bind` to use `=>` syntax instead.

Fat arrows are not just useful when `this` needs to be injected in a function closure, it just cuts down on the amount of typing altogether for very simple function expressions like this one liner:

Before:

```js
var addTwoValues = function (val1, val2) {
  return val1 + val2;
};
```

After:

```js
var addTwoValues = (val1, val2) => val1 + val2;

```

Fat Arrows are NOT simply a replacement for the `function` keyword, but in situations like the one above it helps cut down on the amount of typing.

Here are some examples of what needs to change in lineGraph.js:

Before:

```js
this.fetch().then( function (data) {

}.bind(this));
```


After:

```js
this.fetch().then( (data) => {

});
```

Instead of binding the context to `window.requestAnimationFrame` like so:

Before:

```js
window.requestAnimationFrame(this.step.bind(this));
```

Use lexical scope to pass the context to `window.requestAnimationFrame` via the step function.

After:

```js
this.step = (time) => {

}
```

Remember to remove the instances of `bind` from the calls to `window.requestAnimationFrame`.

---

<a name = "lab1"></a>
## DOM Manipulation & Template Strings (20 min)

ECMAScript 6 also has a new paradigm called 'template strings' that takes the headache out of concatenating template strings and even allows developers to easily bind variables to templates using the `${}` syntax.

Before :

```js
function display (title) {
  this.title = title;
  this.header = document.createElement('header');
  this.header.innerHTML = '<h1>'+
                          this.title+
                          '</h1>';
  document.body.appendChild(this.header);
}
```


After :

```js
function display (title) {
  this.title = title;
  this.header = document.createElement('header');
  this.header.innerHTML = `<h1>
                            ${this.title}
                          </h1>`;
  document.body.appendChild(this.header);
}
```

>* Note: Ask the students to write a method on the prototype of `velocityGraph` that creates a `<header>` DOMElement and sets it's content using a Template String.


---
<a name = "conclusion"></a>
## Conclusion (5 min)

ECMAScript 6 is an exciting new version of the standard that makes JavaScript resemble classical programming languages with the introduction of `class`. The spec also includes support for modules, allowing developers to import and export methods from one `.js` file to another. Fat arrows allow developers to control the context of `this` with writing less code. Template strings cut down on the complexity concatenating a long `String`.

We've picked these four exciting new features, but there are plenty more featured to investigate such as promises, generators, block scope, symbols, weak maps, object and array matching, etc.

### Before Next Class
|   |   |
|---|---|
| **DUE NEXT CLASS**  | [Project 3: Final Project](../../projects/unit4) |
