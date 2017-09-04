export class ChatRoomService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  createChatRoom() {
    let data = {};
    let config = {};
    return this.$http.post('/chatroom', data, config);
  }

  fetchRoomList() {
    this.$http.get('/chatroom', config).then(successCallback, errorCallback);
  }

}

ChatRoomService.$inject = ['$http'];