interface Message {
    type: 'message';
    user_id: number;
    time: string;
    user: string;
    message: string;
}

interface User {
    type: 'user';
    id: number;
    email: string;
}

export { Message, User };
