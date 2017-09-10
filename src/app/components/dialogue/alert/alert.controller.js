export default class AlertDlgController {
  constructor() {

  }

  cancel() {
    console.log("cancel");
    this.dismiss({ $value: 'cancel' });
  }
}