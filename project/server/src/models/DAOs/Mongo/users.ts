import { WelcomeBot } from './models';
import {  models } from './models';
import { Model } from 'mongoose';
import {
    INew_User,
    IMongoUser,
    CUDResponse,
    InternalError,
    IFacebookUser,
    IMongoFBUser,
} from '../../../interfaces/interfaces';
import { Utils } from '../../../common/utils';
import { DBUsersClass } from '../../../interfaces/interfaces';
import { ApiError } from '../../../utils/errorApi';
import { EUsersErrors } from '../../../common/EErrors';

export class MongoUsers {
    private users: Model<INew_User>;
    private FBusers: Model<IFacebookUser>
    constructor(type: string) {
        this.users = models.users;
        this.FBusers = models.facebookUsers;
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
              message: "An error occured",
          } 
    }
    }
    /* PASSPORT_LOCAL
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
                message: "An error occured" as string
            }
        }
    }
    */
    /*  Just for PASSPORT FACEBOOK  */
    async getFBUser(id: string): Promise<IMongoFBUser | ApiError | InternalError> {
        try {
            const doc = await this.FBusers.find({ facebookID: id });
            if(doc.length > 0){
                const result = Utils.extractFBUsers(doc)[0];
                return result
            }else{
                return ApiError.notFound(EUsersErrors.UserNotFound);
            }
        } catch (error) {
            return {
                error: error,
                message: "An error occured."
            }
        }
    }

    /*  Just for PASSPORT FACEBOOK  */
    async saveFBUser(newUser: IFacebookUser): Promise<CUDResponse | InternalError> {
        try {
            const doc = await this.FBusers.create(newUser);
            const result = Utils.extractFBUsers([doc])[0];
            return {
                message: `User successfully created.`,
                data: result,
            }
        } catch (error) {
            return {
                error: error,
                message: "An error occured."
            }
        }
    }

    async add(user: INew_User): Promise<CUDResponse | InternalError> {
        try {
            const doc = await this.users.create(user);
            const result = Utils.extractMongoUsers([doc])[0];
            return {
                message: `User successfully created.`,
                data: result,
            };
        }catch (error) {
            return {
                error: error,
                message: "An error occured",
            }
        }
}

    
}