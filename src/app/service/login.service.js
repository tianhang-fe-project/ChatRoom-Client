export class LoginService {
  constructor($cookies) {
    // 'ngInject';
    this.$cookies = $cookies;
  }

  login(username, email) {
    //set the expired time
    let user = {
      name: username,
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

}

LoginService.$inject = ['$cookies'];