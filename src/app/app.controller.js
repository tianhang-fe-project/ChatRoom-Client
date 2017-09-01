import logo from '../public/img/logo.png'
import avatar from '../public/img/avatar/avatar1.jpg'

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
    console.log(logo);
    this.logo = logo;
    this.avatar = avatar;
  }
  
  onMouseover(){
    console.log("over...");
    this.showMsgBox = true;
  }
}

export default AppCtrl;