import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'

export default class RoomlistController {
  constructor($state, $uibModal, loginService, chatRoomService) {
    'ngInject';
    console.log("room list ...");
    this.logo = logo;
    this.avatar = avatar;
    this.$uibModal = $uibModal;
    this.$state = $state;
    this.roomList = [];
    this.loginService = loginService;
    this.chatRoomService = chatRoomService;
  }

  onCreate() {
    console.log("click ..");
    let modalInstance = this.$uibModal.open({
      animation: true,
      component: 'createroom',
    });

    modalInstance.result.then((roomName) => {
      console.log(roomName);
      this.createChatRoom(roomName);
    }, function() {
      angular.noop();
    });
  }

  loadRoomList() {
    //call api
    this.chatRoomService.fetchRoomList().then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  createChatRoom(roomName) {
    const roomID = new Date().getTime();
    let room = {
      id: roomID,
      // id: 'k12',
      name: roomName
    };
    this.roomList.push(room);

    //call api
    this.chatRoomService.createChatRoom().then((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }

  joinRoom(params) {
    console.log("on click ...");
    if (this.loginService.isLogin()) {
      this.$state.go('chatroom', params);
    } else {
      this.loginService.openLoginDlg((email) => {
        console.log(email);
        this.$state.go('chatroom', params);
      });
    }
  }

  exit() {
    console.log('exit...');
    this.loginService.logout();
  }
}

RoomlistController.$inject = ['$state', '$uibModal', 'loginService', 'chatRoomService'];