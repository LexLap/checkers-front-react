import React, {useContext} from 'react';
// import { SocketContext } from '../../context/SocketContext';

const RespondInvite = ({ initiatorUsername, initiatorSocket, closeResponseModal }) => {
    // const { socket } = useContext(SocketContext)

    return (
        <div className="private-message">
            <div className="private-message__body">
                <h4>You have been invited by: {initiatorUsername}</h4>
                {/* <textarea rows="5" placeholder="Send a message..."></textarea> */}
                <button onClick={() => { closeResponseModal(); 
                    // socket.emit('gameAccept', initiatorSocket)
                }}
                    >Accept</button>
                <button onClick={() => { closeResponseModal();
                // socket.emit('gameRefuse')
            }}
                    >Cancel</button>
            </div>
        </div>
    );
};

export default RespondInvite;