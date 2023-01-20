// When only the name of the module is passed in,
// angular knows to simply reference, not create, the module.
angular.module('IntroToAngularApp')
    .controller('HomeController', HomeController);

// This is the function definition for our controller.
// Note that we capitalize it as it is used as a constructor function!
function HomeController() {
  this.awesome = true;
  this.numbers = [4, 8, 15, 16, 23, 42];
  return this;
}
