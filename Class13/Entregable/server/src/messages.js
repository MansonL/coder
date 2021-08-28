class Messages {
    constructor(){
        this.messages = [];
        this.getMessages = this.getMessages.bind(this);
        this.sendMessages = this.sendMessages.bind(this);
    }
  getMessages (req, res){
    res.send(this.messages);
  }
  sendMessages (req, res){
    const message = req.body;
    this.messages.push(message);
    res.send(this.messages);
    }
}

const controller = new Messages();

export { controller } 