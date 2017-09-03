export default class CreateRoomController {
  constructor() {
    this.roomname = "";
    this.form = {};
  }

  ok(form) {
    // console.log(form);
    this.submitted = true;
    if (!form.$valid) {
      console.log("invalid");
      return;
    }
    this.close({ $value: this.roomname });
  }

  cancel() {
    console.log("cancel");
    this.dismiss({ $value: 'cancel' });
  }
}