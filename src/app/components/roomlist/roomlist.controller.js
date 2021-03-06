import logo from '../../../public/img/logo.png'
import chatroombg from '../../../public/img/chatroombg.jpg'
import avatar from '../../../public/img/avatar/avatar1.jpg'

export default class RoomlistController {
  constructor($state, $uibModal, loginService, chatRoomService, $timeout) {
    'ngInject';
    console.log("room list ...");
    this.logo = logo;
    this.avatar = avatar;
    this.$uibModal = $uibModal;
    this.$state = $state;
    this.$timeout = $timeout;
    this.chatroombg = chatroombg;
    this.roomList = [];
    this.loginService = loginService;
    this.chatRoomService = chatRoomService;
    this.loadRoomList();
    this.isLogin = this.loginService.isLogin();
  }

  onCreate() {
    console.log("click ..");
    this.checkLogin(() => {
      this.openCreateDlg();
    });
  }

  openCreateDlg() {
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
      this.roomList = data.data.roomDetail;
      console.log(this.roomList);
    }, (error) => {
      console.log(error);
    });
  }


  createChatRoom(roomName) {
    const roomID = new Date().getTime();
    let email = this.loginService.getCurrUserEmail();

    let room = {
      id: roomID,
      name: roomName,
      admin: email
    };
    //call api
    this.chatRoomService.createChatRoom(room).then((data) => {
      console.log(data);
      this.loadRoomList();
    }, (error) => {
      console.log(error);
    });
  }

  joinRoom(params) {
    console.log("on click ...");
    console.log(params);
    const join_room_id = params.id;
    if (this.loginService.isLogin()) {
      let email = this.loginService.getCurrUserEmail();
      this.checkBlacklist(email, join_room_id)

    } else {
      this.loginService.openLoginDlg((email) => {
        console.log(email);
        this.checkBlacklist(email, join_room_id)
      }, () => {});
    }
  }

  checkLogin(cb) {
    if (!this.loginService.isLogin()) {
      this.loginService.openLoginDlg((email) => {
        cb();
      }, () => {});
    } else {
      cb();
    }
  }

  checkBlacklist(email, roomid) {
    this.chatRoomService.fetchRoomBlacklist(roomid).then((data) => {
      let blacklist = data.data.blacklist.blacklist;
      console.log(blacklist);
      if (blacklist.indexOf(email) >= 0) {
        //open dlg
        this.loginService.openAlert(() => {

        });

      } else {
        this.$state.go('chatroom', { id: roomid });
      }
    })
  }

  exit() {
    console.log('exit...');
    this.loginService.logout();
    this.$timeout(() => {
      this.$state.reload();
    }, 10)
  }


}

RoomlistController.$inject = ['$state', '$uibModal', 'loginService', 'chatRoomService', '$timeout'];