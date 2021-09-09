import React from 'react';
function Home(): JSX.Element {
    return (
        <div className="text-center d-flex justify-content-center align-items-center text-white mt-2">
            <span>
                Should visit {`  `}
                <a className="text-white" href="http://localhost:3000/chat">
                    `/chat`
                </a>
                {``} to try the chat.
            </span>
        </div>
    );
}

export default Home;
