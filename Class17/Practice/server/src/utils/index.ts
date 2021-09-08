interface Message {
    
    time: string;
    user: string;
    message: string;
    user_id: number;
}

interface User {
    id: number;
    user: string;
}

export { Message, User };
