import React, { useContext } from 'react';
import { GameroomContext } from '../../context/GameRoomContext';
import GameroomMain from './GameroomMain';
import GameroomUsers from './GameroomUsers';
import Loader from '../main/Loader';

const Gameroom = (props) => {
    const { gameroomState } = useContext(GameroomContext);

    return (
        <div className="chatroom-container">
            {
                // gameroomState.isRoomExist ?
                    <div className="chatroom">
                        <GameroomUsers/>
                        <GameroomMain/>
                    </div> 
                    // :
                    // <Loader />
            }
        </div>
    );
};

export default Gameroom;