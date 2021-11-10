import React from 'react';
import GameroomContextProvider from '../../context/GameRoomContext';
import Gameroom from './Gameroom';
// import SocketContextProvider from '../../context/SocketContext'

const GameroomLoader = (props) => {
    const roomId = props.match.params.id;
    const socket = props.match.params.socket
    // return (
    //     <SocketContextProvider>
    //         <GameroomContextProvider roomId={ roomId }>
    //             <Gameroom />
    //         </GameroomContextProvider>
    //     </SocketContextProvider>

    // );
    return (

            <GameroomContextProvider roomId={ roomId }>
                <Gameroom />
            </GameroomContextProvider>


    );
};

export default GameroomLoader;

