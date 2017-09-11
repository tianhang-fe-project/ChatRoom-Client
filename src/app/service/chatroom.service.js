export class ChatRoomService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
    this.URL = 'http://127.0.0.1:8080/api';
    // this.URL = 'http://127.0.0.1:3000';
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

  fetchRoomBlacklist(roomid) {
    return this.$http.get(this.URL + '/blacklist/' + roomid);
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

  fetchRoomInfo(roomid) {
    return this.$http.get(this.URL + '/chatroominfo/' + roomid);
  }


}

ChatRoomService.$inject = ['$http'];