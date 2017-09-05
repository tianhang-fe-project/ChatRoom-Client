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
    console.log(user);
    let today = new Date();
    let expired = new Date(today);
    expired.setDate(today.getDate() + 1); //Set expired date to tomorrow
    this.$cookies.put('user', email, { expires: expired });
    console.log(this.$cookies.get('user'));
    console.log(this.$cookies.get('user'));
  }

  isLogin() {
    return this.$cookies.get('user')
  }

  getCurrUserEmail() {
    return this.$cookies.get('user');
  }

  logout() {
    this.$cookies.remove('user');
  }

  openLoginDlg(cb, cb2) {
    console.log("click ..");
    let modalInstance = this.$uibModal.open({
      animation: true,
      component: 'logindlg',
    });

    modalInstance.result.then((email) => {
      this.login(email);
      cb(email)
    }, function() {
      cb2();
    });
  }

}

LoginService.$inject = ['$cookies', '$uibModal'];