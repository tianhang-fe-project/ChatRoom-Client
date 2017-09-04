export class LoginService {
  constructor($cookies, $uibModal) {
    // 'ngInject';
    this.$cookies = $cookies;
    this.$uibModal = $uibModal;
  }

  login(email) {
    //set the expired time
    let user = {
      email: email
    }
    let today = new Date();
    let expired = new Date(today);
    expired.setDate(today.getDate() + 1); //Set expired date to tomorrow
    this.$cookies.put('user', user, { expires: expired });
  }

  isLogin() {
    return this.$cookies.get('user')
  }

  logout() {
    this.$cookies.remove('user');
  }

  openLoginDlg(cb) {
    console.log("click ..");
    let modalInstance = this.$uibModal.open({
      animation: true,
      component: 'logindlg',
    });

    modalInstance.result.then((email) => {
      this.login(email);
      cb(email)
    }, function() {

    });
  }

}

LoginService.$inject = ['$cookies', '$uibModal'];