interface Message {
    user_id: number;
    time: string;
    user: string;
    message: string;
}

interface User {
    id: number;
    email: string;
}

export { Message, User };
