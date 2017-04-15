angular
  .module('Kuler')
  .controller('PrintsIndexCtrl', PrintsIndexCtrl)
  .controller('PrintsNewCtrl', PrintsNewCtrl)
  .controller('PrintsShowCtrl', PrintsShowCtrl)
  .controller('PrintsEditCtrl', PrintsEditCtrl);

PrintsIndexCtrl.$inject = ['Print'];
function PrintsIndexCtrl(Print) {
  const vm = this;

  vm.all = Print.query();
}

  PrintsNewCtrl.$inject = ['Print', 'User', '$state'];
  function PrintsNewCtrl(Print, User, $state) {
    const vm = this;
    vm.print = {};
    vm.users = User.query();

    function printsCreate() {
      Print
        .save({ print: vm.print })
        .$promise
        .then(() => $state.go('printsIndex'));
    }

    vm.create = printsCreate;
  }

  PrintsShowCtrl.$inject = ['Print', 'User', '$stateParams', '$state', '$auth'];
  function PrintsShowCtrl(Print, User, $stateParams, $state, $auth) {
    const vm = this;
    if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

    vm.print = Print.get($stateParams);

    function printsDelete() {
      vm.print
        .$remove()
        .then(() => $state.go('printsIndex'));
    }

    vm.delete = printsDelete;

    function printsUpdate() {
      Print
        .update({id: vm.print.id, print: vm.print });
    }

  }

  PrintsEditCtrl.$inject = ['Print', 'User', '$stateParams', '$state'];
  function PrintsEditCtrl(Print, User, $stateParams, $state) {
    const vm = this;

    Print.get($stateParams).$promise.then((print) => {
      vm.print = print;
    });

    vm.users = User.query();

    function printsUpdate() {
      Print
        .update({id: vm.print.id, print: vm.print })
        .$promise
        .then(() => $state.go('printsShow', { id: vm.print.id }));
    }

    vm.update = printsUpdate;
  }
