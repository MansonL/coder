import moment from 'moment';
import { Model, model, Schema } from 'mongoose';

interface IMessage {
    time: string;
    user: string;
    message: string;
    user_id: string;
}

interface IUser {
    user: string;
}

const MessageSchema = new Schema<IMessage>({
    time: { type: String, required: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
    user_id: { type: String, required: true },
});
const UserSchema = new Schema<IUser>({
    user: { type: String, required: true },
});
const CMessages = 'messages';
const CUsers = 'users';

const models = {
    users: model<IUser, Model<IUser>>(CUsers, UserSchema),
    messages: model<IMessage, Model<IMessage>>(CMessages, MessageSchema),
};

const welcomeBotMsg = {
    time: moment().format('MM/D/YYYY HH:mm:ss'),
    user: 'WelcomeBot',
    message: 'Welcome everyone to my very simple APP!',
    user_id: '',
};

export { IMessage, IUser, models, welcomeBotMsg };
