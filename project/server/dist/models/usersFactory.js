"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersFactory = void 0;
const productsFactory_1 = require("./productsFactory");
const users_1 = require("./DAOs/Mongo/users");
class UsersFactory {
    static get(type) {
        switch (type) {
            case productsFactory_1.MemoryType.MongoAtlas:
                console.log(`Using MongoAtlas`);
                return new users_1.MongoUsers('atlas');
            case productsFactory_1.MemoryType.LocalMongo:
                console.log(`Using Local Mongo`);
                return new users_1.MongoUsers('local');
            default:
                console.log(`DEFAULT: MongoAtlas`);
                return new users_1.MongoUsers('atlas');
        }
    }
}
exports.UsersFactory = UsersFactory;
