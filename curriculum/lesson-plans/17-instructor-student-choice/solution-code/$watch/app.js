angular
  .module("secretsApp", [])
  .controller("RegistrationController", RegistrationController);

  function RegistrationController($scope) {
    var vm = this;

    $scope.$watch(function(){return vm.email}, function(newVal, oldVal) {
      if (!newVal) return;

      newVal.indexOf('@') === -1  ? vm.emailError = 'Not a valid email' : vm.emailError = '';
    });

    $scope.$watch(function(){return vm.password}, function(newVal, oldVal) {
      if (!newVal) return;

      newVal.length < 5  ? vm.pwdError = 'Password must be at least 5 characters' : vm.pwdError = '';
    });
  }