angular
  .module('Kuler')
  .controller('PrintsIndexCtrl', PrintsIndexCtrl)
  .controller('PrintsNewCtrl', PrintsNewCtrl)
  .controller('PrintsShowCtrl', PrintsShowCtrl)
  .controller('PrintsEditCtrl', PrintsEditCtrl);

PrintsIndexCtrl.$inject = ['Print', 'filterFilter', '$scope'];
function PrintsIndexCtrl(Print, filterFilter, $scope) {
  const vm = this;
  vm.all = Print.query();
}

  PrintsNewCtrl.$inject = ['Print', 'User', '$state'];
  function PrintsNewCtrl(Print, User, $state) {
    const vm = this;
    vm.print = {
      "medium":"Print"
    };
    vm.users = User.query();

    function printsCreate() {
      Print
        .save({ print: vm.print })
        .$promise
        .then(() => $state.go('printsIndex'));
    }

    vm.create = printsCreate;
  }

  PrintsShowCtrl.$inject = ['Print', 'User', 'Comment','$stateParams', '$state', '$auth'];
  function PrintsShowCtrl(Print, User, Comment, $stateParams, $state, $auth) {
    const vm = this;

    if ($auth.getPayload())
      vm.currentUser = User.get({ id: $auth.getPayload().id });

    vm.print = Print.get($stateParams);
    vm.comment = {};

    function printsDelete() {
      vm.print
        .$remove()
        .then(() => $state.go('printsIndex'));
    }
    vm.delete = printsDelete;

    function addComment() {
    vm.comment.print_id = vm.print.id;
    vm.comment.user_id = vm.currentUser.id;
      Comment
        .save({ comment: vm.comment })
        .$promise
        .then((comment) => {
          vm.print.comments.push(comment);
          vm.comment = {};
        });
    }

    vm.addComment = addComment;

    function deleteComment(comment) {
      Comment
        .delete({ id: comment.id })
        .$promise
        .then(() => {
          const index = vm.print.comments.indexOf(comment);
          vm.print.comments.splice(index, 1);
        });
    }

    vm.deleteComment = deleteComment;
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
