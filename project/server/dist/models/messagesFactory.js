"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesFactory = void 0;
const productsFactory_1 = require("./productsFactory");
const messages_1 = require("./DAOs/Mongo/messages");
/**
 *
 *
 * Factory of Messages DAOs
 *
 * This class will return the selected type of memory storage
 *
 *
 */
class MessagesFactory {
    static get(type) {
        switch (type) {
            case productsFactory_1.MemoryType.MongoAtlas:
                console.log(`Using MongoAtlas`);
                return new messages_1.MongoMessages('atlas');
            case productsFactory_1.MemoryType.LocalMongo:
                console.log(`Using Local Mongo`);
                return new messages_1.MongoMessages('local');
            default:
                console.log(`DEFAULT: MongoAtlas`);
                return new messages_1.MongoMessages('atlas');
        }
    }
}
exports.MessagesFactory = MessagesFactory;
