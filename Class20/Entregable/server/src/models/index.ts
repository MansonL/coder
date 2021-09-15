import { Model, model, Schema } from 'mongoose';

interface IMessage {
    _id: string;
    time: string;
    user: string;
    message: string;
    user_id: string;
}

interface IUser {
    _id: string;
    user: string;
}

const MessageSchema = new Schema<IMessage>({
    time: { type: String, required: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
    user_id: { type: String, required: true },
});
const UserSchema = new Schema<IUser>({
    _id: { type: String, required: true },
    user: { type: String, required: true },
});
const CMessages = 'messages';
const CUsers = 'users';

const models = {
    users: model<IUser, Model<IUser>>(CUsers, UserSchema),
    messages: model<IMessage, Model<IMessage>>(CMessages, MessageSchema),
};

export { IMessage, IUser, models };
