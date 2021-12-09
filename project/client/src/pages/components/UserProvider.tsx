import { createContext, useEffect, useState } from "react";
import { IFacebookUser, IMongoUser } from "../../../../server/src/interfaces/interfaces";
import axios from 'axios'
import { authResponse } from '../Main';
import { isFBUser, isUser } from "../../../../server/src/interfaces/checkType";

interface ClickableProps {
    children: JSX.Element[] | JSX.Element;
  }


export const UserContext = createContext({
    DBuser: {
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
    FBUser: {
        timestamp: '',
        facebookID: '',
        name: '',
        surname: '',
        email: '',
        facebookPhotos: [''],
        age: '',
    },
    loggedIn: false,
    updateLoginStatus: () => {},
    updateDBUser: (user: IMongoUser) => {},
    updateFBUser: (user: IFacebookUser) => {},
});

export function UserProvider (props: ClickableProps) {
    const [DBuser, setUser] = useState<IMongoUser>({
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
    const [FBUser, setFBUser] = useState<IFacebookUser>({
        timestamp: '',
        facebookID: '',
        name: '',
        surname: '',
        email: '',
        facebookPhotos: [''],
        age: '',
    })
    const [loggedIn, setLoggedIn] = useState(false);

    const updateLoginStatus = () => {
        setLoggedIn(loggedIn ? false : true)
    }

    const updateDBUser = (user: IMongoUser) => {
        setUser(user)
    }

    const updateFBUser = (user: IFacebookUser) => {
        setFBUser(user)
    }

    const fetchUser = () => {
        axios.get<authResponse>('http://localhost:8080/api/auth/login', { withCredentials: true }).then(response => {
            console.log("Updating status")
            const data = response.data;
            console.log(data);
            if(isFBUser(data.data)){
                setLoggedIn(true);
                setFBUser(data.data);
            }else if(isUser(data.data)){
                setLoggedIn(true);
                setUser(data.data)
            }else {
                setLoggedIn(false);
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
                
            }
        })
    }

    useEffect(() => {
        fetchUser()
    },[])

    return (
        <UserContext.Provider value={{DBuser, FBUser, loggedIn, updateLoginStatus, updateDBUser, updateFBUser}}>
            {props.children}
        </UserContext.Provider>
    )
}