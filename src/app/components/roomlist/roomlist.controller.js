import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'

export default class RoomlistController {
  constructor($state, $uibModal) {
    console.log("room list ...");
    console.log($state);
    this.logo = logo;
    this.avatar = avatar;
    this.$uibModal = $uibModal;
    console.log(this);
  }

  onCreate() {
    // this.$uibModal
    console.log("click ..");
    let modalInstance = this.$uibModal.open({
      animation: true,
      component: 'createroom',
      resolve: {
        items: function() {
          // return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      // $ctrl.selected = selectedItem;
    }, function() {
      // $log.info('modal-component dismissed at: ' + new Date());
    });
  }
}