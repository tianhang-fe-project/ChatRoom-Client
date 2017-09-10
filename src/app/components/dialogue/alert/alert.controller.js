export default class AlertDlgController {
  constructor() {

  }

  ok() {
    console.log("cancel");
    this.dismiss({ $value: 'cancel' });
  }
}