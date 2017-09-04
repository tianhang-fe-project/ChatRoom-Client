import angular from 'angular';
import loginSerivce from './login.service';


let serviceModule = angular
  .module('serviceModule', [])
  .service('loginSerivce', loginSerivce)

export default serviceModule;