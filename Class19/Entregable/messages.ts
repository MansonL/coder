import * as fsPromises from 'fs/promises';
import * as moment from 'moment';
import * as path from 'path';
import axios from 'axios';

const messagesPath: string = path.resolve(__dirname + '/messages.json');

interface IChat {
    time: string;
    user: string;
    message: string;
}

interface IUsername {
    first: string;
    last: string;
}
interface IQuotes {
    text: string;
}

const newMessages = async () => {
    const quotes: [] = await (await axios.get('https://goquotes-api.herokuapp.com/api/v1/random?count=10')).data.quotes;
    const messages = quotes.map((messages: IQuotes) => messages.text);
    return messages;
};

const newUsers = async () => {
    const users = [];
    for (let i = 0; i < 10; i++) {
        const { first, last }: IUsername = (await axios.get('https://randomuser.me/api/')).data.results[0].name;
        users.push(first + last);
    }
    return users;
};

const addMessages = async (): Promise<void> => {
    const messages = await newMessages();
    const users = await newUsers();
    const chat: IChat[] = users.map((user: string, idx: number) => ({
        time: moment().format('LLL'),
        user: user,
        message: messages[idx],
    }));
    await fsPromises.writeFile(messagesPath, JSON.stringify(chat, null, '\t'));
};

addMessages();
