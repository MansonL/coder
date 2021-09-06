interface Message {
    type: "message",
    time: string,
    user: string,
    message: string
}

interface User {
    type:"user",
    email: string
}

export {Message, User}