import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'



export default class RoomlistController {
  constructor($state, $uibModal, loginService) {
    // 'ngInject';
    console.log("room list ...");
    console.log($state);
    this.logo = logo;
    this.avatar = avatar;
    this.$uibModal = $uibModal;
    this.roomList = [];
    console.log(this);
    // this.loginService = loginService;
    // console.log(loginService);
  }

  onCreate() {
    console.log("click ..");
    let modalInstance = this.$uibModal.open({
      animation: true,
      component: 'createroom',
      // resolve: {
      //   items: function() {
      //     return $ctrl.items;
      //   }
      // }
    });

    modalInstance.result.then((roomName) => {
      console.log(roomName);
      this.createChatRoom(roomName);
    }, function() {
      // $log.info('modal-component dismissed at: ' + new Date());
    });
  }

  createChatRoom(roomName) {
    const roomID = new Date().getTime();
    let room = {
      // id: roomID,
      id: 'k12',
      name: roomName
    };
    this.roomList.push(room);
  }
}

RoomlistController.$inject = ['$state', '$uibModal', 'loginService'];