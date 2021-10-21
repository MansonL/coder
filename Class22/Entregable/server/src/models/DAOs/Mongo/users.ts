import { WelcomeBot } from "./models";
import { atlasURI, mongoURI, models } from "./models";
import { connect, Model } from "mongoose";
import { INew_User, IMongoUser, CUDResponse} from "../../../interfaces/interfaces";
import { utils } from "../../../common/utils";
import { DBUsersClass } from "../../../interfaces/interfaces";

export class MongoUsers implements DBUsersClass {
    private users: Model<INew_User>;
    constructor(type: string) {
        this.users = models.users;
        this.init();
    }
    async init() {
        await this.users.deleteMany({});
        await WelcomeBot.save();
        console.log(`Users initialized`)
    }
    async get(id?: string | undefined): Promise<IMongoUser[] | []> {
        if(id != null){
            const docs = await this.users.find({_id: id});
            if(docs.length > 0){
            const user : IMongoUser[] = utils.extractMongoUsers(docs);
            return user
            }else{
                return []
            }
        }else{
        const docs = await this.users.find({});
        if (docs.length > 0) {
            const users: IMongoUser[] = utils.extractMongoUsers(docs);
            return users;
        } else {
            return [];
        }
        }
    }
    async add(user: INew_User): Promise<CUDResponse> {
        const doc = await this.users.create(user);
        const result = utils.extractMongoUsers([doc])[0];
        return {
            message: `Message successfully added.`,
            data: result,
        };
    }
}
