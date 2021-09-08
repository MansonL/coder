import React, { useState } from 'react';
import { IUser } from '../utils/Types';
import socket from '../lib/socket';
import axios from 'axios';

function Users(): JSX.Element {
    const [users, setUsers] = useState<IUser[]>([]);

    const renderUsers = async () => {
        const data = await (await axios.get('http://localhost/messages')).data;
        console.log(data);
        setUsers(data);
    };
    socket.on('updateUsers', renderUsers);

    return (
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
    );
}

export default Users;
