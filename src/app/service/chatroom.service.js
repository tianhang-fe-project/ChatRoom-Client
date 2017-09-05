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

  fetchMsgList(roomid, page = 0) {
    let config = {
      params: { page: page }
    }
    return this.$http.get(this.URL + '/message/' + roomid, config);
  }

  fetchRoomUserList(roomid) {
    return this.$http.get(this.URL + '/user/' + roomid);
  }

}

ChatRoomService.$inject = ['$http'];