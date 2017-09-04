export class ChatRoomService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
    this.URL = 'http://localhost:3000';
  }

  createChatRoom(roomInfo) {
    let config = {};
    console.log(roomInfo);
    return this.$http.post(this.URL + '/chatroom', roomInfo, config);
  }

  fetchRoomList() {
    // let config = {};
    return this.$http.get(this.URL + '/chatroom');
  }

}

ChatRoomService.$inject = ['$http'];