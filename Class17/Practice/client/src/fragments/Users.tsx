import React, { useState } from 'react';
import { IUser } from '../utils/Types';
import socket from '../lib/socket';
import axios from 'axios';

function Users(): JSX.Element {
    const [users, setUsers] = useState<IUser[]>([]);

    const renderUsers = async () => {
        const data = await (await axios.get('http://localhost:8080/users')).data;
        console.log(data);
        setUsers(data);
    };
    socket.on('updateUsers', renderUsers);
    socket.on('renderAll', renderUsers);
    return (
        <div>
            <span className="d-5 text-white text-center">Active users:</span>
                    <div className="card">
                            <div className="card-body bg-white rounded text-left" id="users">
                                {users.length > 0 &&
                                    users.map((users, idx) => {
                                        return (
                                            <div key={idx}>
                                                <span>{users.user}</span>
                                            </div>
                        );
                    })}
            </div>
        </div>
        </div>
    );
}

export default Users;
