import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'

export default class RoomlistController {
  constructor($state, $uibModal) {
    console.log("room list ...");
    console.log($state);
    this.logo = logo;
    this.avatar = avatar;
    this.$uibModal = $uibModal;

  }

  joinRoom(id) {
    console.log("heloo");

  }
}