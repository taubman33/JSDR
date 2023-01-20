# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Instructor/Student Choice: MVC and Intro to Angular (3:00)


> Instructor Note: Please note that this is an optional lesson on MVC and Angular. You may choose to pick another topic or framework to teach. Please keep in mind that what you teach aligns with the curriculum and the final project.


| Timing | Type | Topic |
| --- | --- | --- |
| 15 min | [Opening](#opening) | Introduction to MVC |
| 20 min | [Introduction](#introduction1) | Intro to Angular - What is AngularJS and Why Should You Learn it? |
| 20 min | [Codealong](#codealong1) | Basic Setup: Modules, Controllers, Views |
| 15 min | [Codealong](#codealong2) | A Very Basic Controller |
| 5 min | [Lab](#lab1) | Adding data to your Controller: Independent Practice |
| 10 min | [Codealong](#codealong3) | Connecting Controller To The View |
| 10 min | [Lab](#lab2) | Independent Practice  |
| 10 min |  [Introduction](#introduction2)| Angular Magic |
| 10 min |  [Demo](#demo1)| $watch list |
| 15 min |  [Demo](#demo2)| $digest cycle |
| 20 min |  [Codealong](#codealong4)| $watch |
| 15 min |  [Lab](#lab3)| Independent Practice |
| 20 min |  [Conclusion](#conclusion)| Final Questions & Exit Tickets |

### Objectives

_Before this lesson, students should already be able to:_

- Understand the role of Model, View and Controller.
- Describe why learning Angular is important.
- Set up an Angular app and test that it works.
- Build a very basic controller with fake data.
- Render basic controller data in the view.
- Bind basic data with a controller variable.
- Explain the differences and similarities between $scope and controllerAs.
- Describe data-binding using:
  - digest loop
  - dirty-checking
  - $watch list
- Manipulate a model with $watch.

### Preparation

_After this lesson, students will be able to:_

- Know how to build JS constructor functions.

>Note: Last class, we learned how to deploy our app using Github Pages and Heroku. Check with students to make sure that everyone is comfortable with the materials covered in the last class.

---

## Introduction to MVC (15 min)
<a name = "opening"></a>

As we develop more complex full-stack applications, it is extremely beneficial in our development to create a _separation of concerns_. If we divide the tasks of our app into their own components we create a development environment that is easier to navigate through and further, increases reusability of code since components can be plugged in where their purpose is needed.  Arguably the most well-known and implemented separation of concerns architecture for apps is the Model-View-Controller, or simply _MVC_.

On a high level, the MVC architectural pattern can be broken down like so:

- **Model**: handles data and business logic
- **View**: presents data to User in any supported format and layout
- **Controller**: receives user inputs and call appropriate resources to carry them out

![](http://www.beansoftware.com/ASP.NET-Tutorials/Images/MVC-Diagram.gif)

### Model

The model is the data of an application and the rules applying to said data. For example, imagine you have an application that requires users to sign up. When a user signs up, you need to save him/her to your database so that your app can recognize them when they try to sign in at a later point. However, what data do you want allowed into your database? Should the password be saved in the same form as it is given by the user? Besides providing the data, the model also serves as somewhat of a gatekeeper dictating what type of data can be saved (you only want relevant data, right?) and further, it performs logic on incoming/outgoing data so it can do things like serialize your user's password so it's encrypted in your database.

### View

The view is simply the user interface, everything the user can see and respond to on the screen. As you are surfing the web, staring at your screen, everything within your vision is considered part of the view: buttons, text, input, etc.

### Controller

The controller serves as the intermediary between the view and the model, performing any logic necessary in between. From the view to the model, it manages the user requests (HTTP GETs, POSTs, etc.) and updates the database. For example, if you had a cooking recipe application but a user needed to change one of the ingredients, they could send over the new ingredients over in a PUT/PATCH HTTP call where the controller would then send the appropriate data over to the model to update the database. On the other side of the spectrum, if another user wanted to view all the recipes, they'd ping one of the application's controllers with a GET method, asking the model for a specific resource which well then be sent over to update the view.

As discussed, having our apps architected in this MVC way really helps create an easier and more maintainable development environment. This leads us into our next topic of frameworks. Developers are prone to use frameworks because they come with MVC already in place, and we merely have to extend them with our own custom functionality. Today we will be introducing one most popular front-end frameworks in-use by the tech industry, AngularJS.

---
<a name = "introduction1"></a>
## Intro to Angular - What is AngularJS and Why Should You Learn it? (20 min)


Angular is an open source JS framework maintained by Google. Maybe you've heard of them?  It was created nearly 6 years ago. Its longevity is a testament to its capability and usefulness.  AngularJS is one of the most widely adopted MVC JS frameworks in use today and is a valuable job skill to put on your resume.

AngularJS provides the following benefits when used to develop web apps:
- Enables us to organize and structure single page apps using the popular MVC design pattern.
- Makes us more productive when developing web apps because it provides features, such as data binding, that requires less code from the developer.
- Was designed with testing in mind.

#### The Components of AngularJS

![angular_components](https://cloud.githubusercontent.com/assets/25366/8970275/a1ab2ee2-35fd-11e5-8b23-65f4159ff7d6.jpg)

#### Modules

Modules are containers for related code.  The concept of *modules* is prevalent throughout programming, and here, we can consider it essentially a container for our app.

#### Config & Routes

Each AngularJS module has a *config* method that allows us to provide code that runs when a module is loaded.  The *config* method is used most commonly to setup routing.

#### Controller

Controllers in AngularJS serve two primary purposes:

- Initialize the data used for the view they are attached to.
- Contain the primary code to respond to user events, such as when a user clicks on a button.

A controller is a JS constructor function that is instantiated by the _ng-controller_ directive.

#### Services & Factories

Services provide a way to organize related code and data that can be shared by controllers and even other services. Unlike controllers, which are instantiated and destroyed as the views they are attached to come into and out of view, services are created once (singletons) and persist for the life of the application.

Services should be used to hold the bulk of your application's logic and data, thus keeping controllers focused on what they are responsible for. Often, you can consider a service or factory something like a model or Ruby class.

#### Directives

Directives are "markers" in HTML, most commonly as attributes and custom element tags. When processed by AngularJS's HTML compiler, they attach behavior to DOM elements or even transform them and/or their children.


#### Filters

Filters are used to transform data. They are very flexible and can be used for formatting text in a view, such as making it all uppercase, or used to filter and sort an array of items.

#### The AngularJS Mindset

Programming a web app with AngularJS requires a different mindset. To use AngularJS effectively, it helps to think of your application being driven by data - you change data, the app responds. We naturally think more procedurally when coding, we attach an event handler and write code to respond.

Let's look at an example of the different approaches.  Say we want an edit form to show when a button is clicked:

- Procedurally, we would attach an event handler to the button.  The handler code would select the element and set its display property to something besides "none".
- Using AngularJS, we declare a click handler on the Button element.  The handler could set a variable named editMode equal to true, and the view would respond automatically.
- Remember, drive your application using data - your data model is the single source of truth!

---

<a name = "codealong1"></a>
## Basic Setup: Modules, Controllers, Views (20 min)

In your starter folder, you'll see some empty files and a couple of folders.

First, let's get Angular from [Google's CDN](https://developers.google.com/speed/libraries/#angularjs) and paste into script tag in the ```<head>```.

```html
 <head>
   <meta charset="utf-8">
   <title>Intro to Angular</title>
   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
 </head>
```


Now, we set up a module. Go to your `app.js` file, and all it takes is this little line:

```js
// Define a new module. The first argument is what we want to call our app, the second is an array of dependencies (which we don't need at the moment, so there are none)
angular.module('IntroToAngularApp', []);
```

This sets our app up. It's important to include that array when defining a module, even if there are no dependencies – that tells Angular we're initializing a module.

Now, back in our HTML, make sure your `app.js` is included in a script tag, and add an `ng-app` directive in the `<html>` tag to initialize the AngularJS application.

```html
<!DOCTYPE html>
<html ng-app="IntroToAngularApp">
  <head>
    <meta charset="utf-8">
    <title>Intro to Angular</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="js/app.js"></script>
  </head>
```

Since we defined it in `app.js` with a name of `IntroToAngularApp`, we just reference what we named it here. This tells the HTML to use that module.

Now, let's just check to make sure it worked. If it worked correctly, we should be able to put some simple expression in our HTML, and Angular will render it.

```html
<body>
{{ 1 + 1 }}
</body>
```

If Angular's working, it'll add our numbers together and spit out a 2 on the page – that's how templating works in Angular, inside curly brackets, also known as handlebars. Angular will evaluate any expression within `{{}}` in the DOM.

Open it up in a browser to check. And remember, if it doesn't work, always check your browser's console for errors!

---
<a name = "codealong2"></a>
## A Very Basic Controller (15 min)

In Angular's flavor of MVC, controllers are intended to primarily:

1. Respond to user actions.
2. Provide data to the view (occasionally referred to the view-model).

Let's create a new controller and plug it into our module:

```bash
touch js/homeController.js
```

```javascript
// When only the name of the module is passed in,
// angular knows to simply reference, not create, the module.
angular.module('IntroToAngularApp')
    .controller('HomeController', HomeController);

// This is the function definition for our controller.
// Note that we capitalize it as it is used as a constructor function!
function HomeController() {

}
```

Now, there are two acceptable methods for defining controllers.  They are commonly referred to as the:

- _$scope_ method
- _controllerAs_ method

Now, they're the same idea – essentially a way to craft a constructor function for each controller you decide to make. Angular started by using $scope, which you can see an example of here:

```javascript
// When only the name of the module is passed in,
// the 'module' method returns the specified module.
angular.module('IntroToAngularApp')
    .controller('HomeController', HomeController);

// This is the function definition for our controller.
// Note that we capitalize it as it is used as a constructor function!
function HomeController($scope) {
  $scope.awesome = true;
}
```

However, as developers started using Angular more and more in production and nesting controllers people started discovering that despite the name, $scope wasn't scoped very well. Context, _this_, was lost and/or impossible to manage.

A lot of professionals have since moved on to _controllerAs_ syntax.

```javascript
// When only the name of the module is passed in,
// the 'module' method returns the specified module.
angular.module('IntroToAngularApp')
    .controller('HomeController', HomeController);

// This is the function definition for our controller.
// Note that we capitalize it as it is used as a constructor function!
function HomeController() {
  this.awesome = true;
  return this;
}
```

The nice thing is that they're not very different, but that the latter looks far more like a normal constructor function you're used to and most importantly, a controller always references the correct context.

Later, we'll see how you can let controllers just connect models and the views - like we're used to - but since we don't have a model, let's just hardcode some junk in there.

--

<a name = "lab1"></a>
## Adding data to your Controller: Independent Practice (5 min)

Take five minutes and add some data into your `HomeController`. Any sort of data will do so just come up with a few different data types to play with.

```js
function HomeController() {
  this.awesome = true;
  this.numbers = [4, 8, 15, 16, 23, 42];
  // etc, etc.
  return this;
}
```

---

<a name = "codealong3"></a>
## Connecting Controller To The View (10 min)

The last step here is to connect our controller to the view. We attach any controllers to some div or HTML tag in our view. But first, make sure to include any newly created JS files.

```html
<html ng-app="IntroToAngularApp">
  <head>
    <meta charset="utf-8">
    <title>Intro to Angular</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="js/app.js"></script>
    <script src="js/homeController.js"></script>
  </head>
```

Now:

```html
<body>
  <section ng-controller="HomeController as home">
    {{home.awesome}}
  </section>
</body>
```

When you render the page, it should actually render! That's awesome – that means we're working with data that's coming from our controller, and that's the core building block to more complex apps!

**note:** Keep in mind, while `HomeController` is named so, because that's what we called it in the file, the `home` in this example is just a variable we're declaring on the spot. Pick something obvious that makes sense, but it can be anything.

---

<a name = "lab2"></a>
## Independent Practice (10 min)

In pairs, for the next 10 minutes, work together to take the random data you put into your controllers earlier and show them in the view. After, experiment with making a new controller from scratch, including it in your HTML, and showing that in the view, too – it'll give you a little practice with all the setup.

---
<a name = "introduction2"></a>
## Angular Magic: Introduction (10 min)

So far we have covered how to bind controller data into a view by utilizing either $scope or controllerAs syntax. Now that we know the fundamentals in setting up this data-binding functionality, let's take a step back to explain how Angular's "magic" works under the hood making it all possible.

Have a look at this example:

```html
...
<input type="text" ng-model="user.name">
<h2>{{user.name}}</h2>
...
```

Here we have two elements: One is an input with ngModel that will bind input to a property on the scope, in our case `user.name`; the other element is an h2 tag that has handlebar templating that will bind a scope property to the DOM, specifically `user.name`.

As you type in the input something magical happens. Each letter appears in the h2 node on every keystroke! We didn't even have to setup an Angular controller! Cool, more Angular magic, but how is this working?! How does Angular not only know to bind the user input to the DOM, but to do so as soon as the user types each character? Is Angular watching us? As creepy as it sounds, yes, Angular is watching us and it has us on its $watch list.

---

<a name = "demo1"></a>
## $watch list (15 min)

As you already know, with Javascript the browser listens for events such as clicks and handles them with the appropriate callback in a process that is known as the event loop. Acknowledging the power in being able to have event listeners and handlers, Angular extends the Javascript event loop with what is known as Angular context. Simply, this context is made up of the models that have been attached to the DOM. Every time you extend the "angular context" within your UI, whether it be with {{}} or an ngDirective like ngModel, Angular adds that context/model to its $watch list. It is this $watch list that gives Angular its event listener-type functionality.

```javascript
angular
  .module("secretsApp", [])
  .controller("SecretsController", SecretsController);

  function SecretsController() {
    this.name = "Chris";
    this.age = 27;
  }
```

```html
<h1>
  Hi, {{name}}!
</h1>
```

Looking at this code, how many models do you think are on the $watch list? We have two properties declared on the scope - `name` and `age`. However, since only one of them, `name`, is attached to the DOM, only one is on the $watch list. Angular doesn't care/doesn't need to watch any property that isn't in the UI because its data has no affect on our view. Now that we've covered what Angular will listen/$watch for, we can move on to how angular will handle a change in the model.

---
<a name = "demo2"></a>
## $digest cycle (15 min)

```html
...
<input type="text" ng-model="user.name">
<input type="text" ng-model="age">
<h2>Name: {{user.name}}</h2>
<h2>Age: {{age}}</h2>
...
```

Can you shout out how many angular models are on the $watch list? Currently, our Angular context contains `user.name` and `user.age` - that means those models have been added to the $watch list that is watching them for any change. As soon as the user updates either of these models in any way by creating/deleting a value in the input, the $watch listener is triggered and kicks off Angular's version of the js event loop: the $digest loop a.k.a. the $digest cycle.

If we were to type in the input with `ng-model="user.age"`, this is what the $digest cycle would look like:

- `user.name`! Has your value changed?
  - "nope"
- Alright, I'll mosey on down the $watch list and check the others.
- Yo `user.age`, has _your_ value changed?
  - "Actually, now that you've mentioned it, it has! I'm now an 8!""
- Oh really?! Noted! I best start from the top of the list to see if this change affects any of the other models.
- `user.name`, you still the same?
  - "I sure am!"
- And you, `user.age`, you haven't gone and changed since I last checked, have you?
 - "Naw, I'm still carrying the same value.""
- OK then! All changes to the models have been accounted for, so I'm going to go over to the DOM with this new model data so it can update accordingly. Thanks y'all!

This process of the $digest cycle, of checking a current state to a previous state, is a concept known as "dirty-checking". When the value of a model has an observed change, it is marked as "dirty" and since a model's value may affect another model's value, the $digest cycle restarts from the beginning of the $watch list to check for any possible ripple effect. Once all model changes have been accounted for, the $digest cycle ends and the DOM will be updated. This is how Angular knows to update that h2 tag with your input _as_ you type it. Alas, another one of magic's biggest secrets [revealed](https://www.youtube.com/watch?v=JT4YFHB-mvc)!

---
<a name = "codealong4"></a>
## $watch (20 mins)

Now that we have a pretty solid understanding of how Angular's $digest cycle works, let's tap into it and extend its $watch functionality!

First, let's open up the starter code and look at the controller (app.js):

```javascript
angular
  .module("registrationApp", [])
  .controller("RegistrationController", RegistrationController);

  function RegistrationController() {
  // nothing going on in here yet
  }
```

Next, attach your controller to the DOM:

```html
<div ng-controller="RegistrationController as registration">
  <input type="text" ng-model="registration.name">
  {{registration.name}}
</div>
```

Now that we have our basics setup, let's define our own custom $watch method!

```javascript
...
  function RegistrationController($scope) {
    var vm = this;

    $scope.$watch(function(){return vm.name}, function(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
    })
  }
```

So there are a several things going on here: first, we inject $scope into our controller which subsequently gives us use of the $watch method; second, we make a reference to the context of the controller with the variable `vm` so that we can refer to it later on; then, we go ahead and define our $watch method.

The first argument to the `$watch` method is the name of the model that we wish to watch, `vm.name`. Our second argument is a callback to our registered $watch listener that will perform whatever functionality we define. This callback returns the new and old values of the model we are watching, `vm.name`, so that we can manipulate the model data before it is returned to the view. That's the whole point, right? To be able to inject some extra model-manipulating functionality into the $digest cycle.

Now, go ahead and start typing in the input and you should see your logs!

You should see something like this:

![image](https://s3.amazonaws.com/f.cl.ly/items/281J0I2v383T1R0a1L2e/Image%202015-10-29%20at%2012.06.55%20AM.png)

Pretty cool, eh? Is your mind starting to go wild with ideas? Before we continue, note those `undefined`s we're seeing right off the bat. Those are appearing because the $digest cycle not only runs when a model changes, but also upon initialization of your app. To get rid of that, simply throw in an early return if there's no new value entered, `if (!newVal) return`.

Now we can use the $watch to do fun stuff like count the number of characters being typed and bind that value into the DOM.

```html
<div ng-controller="RegistrationController as registration">
  <input type="text" ng-model="registration.name">
  {{registration.name}}
  <br>
  <h4>Character count: {{registration.characters}}</h4>
</div>
```

```javascript
...
  function RegistrationController($scope) {
    var vm = this;
    $scope.$watch(function(){return vm.name}, function(newVal, oldVal) {
      vm.characters = newVal.length;
    })
  }
```

**note:** `vm` is short for _view model_ which is a term referring to the model data we put into the view.

---

<a name = "lab3"></a>
## Independent Practice (15 minutes)

Now make this knowledge your own! In pairs, or on your own, use the starter code to validate the email and password inputs. The user must input an `@` for email and have at least five letters. If these requirements are not met, some warning prompt should be shown in the UI.

---

<a name = "conclusion"></a>
## Conclusion (10 mins)

Review class objectives and the following questions:

- What is MVC?
- What is are the roles of each character in MVC?
- How do we define a new module when starting an application?
- When you create an example controller from scratch, what type of JS function is this?
- How do we render data in the view? What does the templating look like in Angular?
- What is the $digest cycle and what does it have to do with $watch list?
- When is a model added to the $watch list?
- How many times does the $digest cycle run?
- How do you go about creating your own $watch?

### Before Next Class
|   |   |
|---|---|
| **UPCOMING PROJECTS**  | [Project 3: Final Project](../../projects/unit4) |

#### Further Resources:

- [scotch.io]https://scotch.io/
- [thinkster.io]https://thinkster.io/a-better-way-to-learn-angularjs
- [AngularJS Fundamentals In 60-ish Minutes]https://www.youtube.com/watch?v=i9MHigUZKEM
