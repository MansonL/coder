import { MemoryType } from "./productsFactory";
import { MongoUsers } from "./DAOs/Mongo/users";

export class UsersFactory {
    static get(type: MemoryType): MongoUsers {
        switch (type) {
            case MemoryType.MongoAtlas:
                console.log(`Using MongoAtlas`);
                return new MongoUsers('atlas');
            case MemoryType.LocalMongo:
                console.log(`Using Local Mongo`);
                return new MongoUsers('local');
            default:
                console.log(`DEFAULT: MongoAtlas`);
                return new MongoUsers('atlas');
        }
    }
}