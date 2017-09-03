import controller from './app.controller.js'
// import '../style/app.css';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/base.css';
import template from './app.html';

let appComponent = {
  template,
  controller,
  controllerAs: 'vm'
};

export default appComponent;