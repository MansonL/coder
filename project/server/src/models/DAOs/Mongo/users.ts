import { WelcomeBot } from './models';
import { atlasURI, mongoURI, models } from './models';
import { connect, Model } from 'mongoose';
import {
    INew_User,
    IMongoUser,
    CUDResponse,
    InternalError,
} from '../../../interfaces/interfaces';
import { Utils } from '../../../common/utils';
import { DBUsersClass } from '../../../interfaces/interfaces';
import { ApiError } from '../../../utils/errorApi';
import { EUsersErrors } from '../../../common/EErrors';

export class MongoUsers implements DBUsersClass {
    private users: Model<INew_User>;
    constructor(type: string) {
        this.users = models.users;
        this.init();
    }
    async init() {
        await this.users.deleteMany({});
        await WelcomeBot.save();
        console.log(`Users initialized`);
    }
    async get(id?: string | undefined): Promise<IMongoUser[] | ApiError | InternalError> {
      try {
        if (id != null) {
            const docs = await this.users.find({ _id: id });
            if (docs.length > 0) {
                const user: IMongoUser[] = Utils.extractMongoUsers(docs);
                return user;
            } else {
                return ApiError.badRequest(EUsersErrors.UserNotFound)
            }
        } else {
            const docs = await this.users.find({});
            if (docs.length > 0) {
                const users: IMongoUser[] = Utils.extractMongoUsers(docs);
                return users;
            } else {
                return ApiError.notFound(EUsersErrors.NoUsers)
            }
        }
       } catch (error) {
          return {
              error: error,
              message: error.message as string,
          } 
    }
    }
    async getByUser(username: string): Promise<IMongoUser | ApiError | InternalError> {
        try {
            const doc = await this.users.findOne({ username: username });
            console.log(doc);
            if(doc){
                const user : IMongoUser = Utils.extractMongoUsers([doc])[0]
                return user
            }else{
                return ApiError.notFound(EUsersErrors.UserNotFound);
            }
        } catch (error) {
            return {
                error: error,
                message: error.message as string
            }
        }
    }
    async add(user: INew_User): Promise<CUDResponse | InternalError> {
        try {
            const doc = await this.users.create(user);
            const result = Utils.extractMongoUsers([doc])[0];
            return {
                message: `Message successfully added.`,
                data: result,
            };
        }catch (error) {
            return {
                error: error,
                message: error.message,
            }
        }
}
}