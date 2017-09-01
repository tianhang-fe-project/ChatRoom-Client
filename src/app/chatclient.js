
import SockJS from 'sockjs-client'
class chatClient{
    constructor(options,onclose,onopen,onmessage){
        if (options) {
           this.options = options;
         }
        this.client = new SockJS(this.options.url);
        // 每个事件的 this 指向 client 对象
        this.client.onclose = onclose;
        this.client.onopen = onopen;
        this.client.onmessage = onmessage;
        console.log(this);
    }
    
    sendMsg(text,socketId){
        if(!this.client) {
           return;
        }
        this.client.send('post'+' '+socketId+' '+text);
    }
    sendGroupMsg(text,roomId){
       if(!this.client) {
           return;
        }
        this.client.send('postgroup'+' '+roomId+' '+ text); 
    }
}

export default chatClient;