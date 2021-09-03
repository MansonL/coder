import db from "../options/mariaDB"

class MessageDB {
    db : any;
    constructor() {
        this.db = db;
        
    }
}