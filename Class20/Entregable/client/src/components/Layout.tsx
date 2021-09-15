import React from 'react';
import Chat from '../fragments/Chat';
import Users from '../fragments/Users';

function Layout(): JSX.Element {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 col-sm-6 ">
                    <div className="container">
                        <Chat />
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <div className="container">
                        <Users />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Layout;
