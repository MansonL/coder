import { createContext, useEffect, useState } from "react";
import { IUser } from "../../../../server/src/interfaces/interfaces";
import axios from 'axios'
import { authResponse } from '../Main';

interface ClickableProps {
    children: JSX.Element[] | JSX.Element;
  }


export const UserContext = createContext({
    user: {
        _id: '',
    timestamp: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    alias: '',
    age: '',
    avatar: '',
    },
    loggedIn: false,
    updateLoginStatus: () => {},
    updateUser: (user: IUser) => {},
});

export function UserProvider (props: ClickableProps) {
    const [user, setUser] = useState<IUser>({
        _id: '',
        timestamp: '',
        username: '',
        password: '',
        name: '',
        surname: '',
        alias: '',
        age: '',
        avatar: '',
    });
    const [loggedIn, setLoggedIn] = useState(false);

    const updateLoginStatus = () => {
        setLoggedIn(loggedIn ? false : true)
    }

    const updateUser = (user: IUser) => {
        setUser(user)
    }

    const fetchUser = () => {
        axios.get<authResponse>('http://localhost:8080/api/auth/login', { withCredentials: true }).then(response => {
            console.log("Updating status")
            const data = response.data;
            if(data.data[0]){
                setLoggedIn(true);
                setUser(data.data[0]);
            }else{
                setUser({
                    _id: '',
            timestamp: '',
            username: '',
            password: '',
            name: '',
            surname: '',
            alias: '',
            age: '',
            avatar: '',
                })
                setLoggedIn(false);
            }
        })
    }

    useEffect(() => {
        fetchUser()
    },[])

    return (
        <UserContext.Provider value={{user, loggedIn, updateLoginStatus, updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}