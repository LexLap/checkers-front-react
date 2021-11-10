import React, {useContext} from 'react';
// import { SocketContext } from '../../context/SocketContext';
// import { LoginContext } from '../../context/LoginContext';

const SendInvite = ({ user, SendInvite }) => {
    // const { socket } = useContext(SocketContext)

    return (
        <div className="private-message">
            <div className="private-message__body">
                <h4>Invite to game: {user.username}</h4>
                {/* <textarea rows="5" placeholder="Send a message..."></textarea> */}
                <button onClick={() => { SendInvite(); 
                    // socket.emit('gameInvite', user.socketID)
                }}
                    >Invite</button>
                <button onClick={() => { SendInvite();}}
                    >Cancel</button>
            </div>
        </div>
    );
};

export default SendInvite;