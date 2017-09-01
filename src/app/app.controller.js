import logo from '../public/img/logo.png'
import avatar from '../public/img/avatar/avatar1.jpg'
import SockJS from 'sockjs-client'
import chatClient from './chatclient.js'

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
    console.log(logo);
    this.logo = logo;
    this.avatar = avatar;
    console.log("---socket--");
   
    this.initClient();
    
  }
  initClient(){
    let options ={
      url : "http://localhost:8888/daemon"
    };
    let client = new chatClient(options,this.onClose,this.onOpen,this.onMessage)
    // console.log(sock); 
  }
  
  
  sendMsg(msg,socketId){
    
  }
  
  sendGroupMsg(msg,roomId){
    
  }
  
  //callbak functions
  onOpen(){
    console.log('open');
    console.log(this)
    this.send('join ' + JSON.stringify({
           tid: "123456"
      }));
    this.send('post ' +'hello world!'); 
  }
  
  onMessage(e){
    console.log('msg');
    console.log(e);
    console.log('message:', e.data);
  }
  
  onClose(){
    console.log('close');
  }
  
  onMouseover(){
    console.log("over...");
    this.showMsgBox = true;
  }
}

export default AppCtrl;