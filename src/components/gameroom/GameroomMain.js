import React, { useContext, useEffect } from 'react';
import { GameroomContext } from '../../context/GameRoomContext';


const GameroomMain = (props) => {
    const { gameroomState } = useContext(GameroomContext);

    useEffect(() => {
        console.log("chatroomMain rendering");
    });

    useEffect(() => {
        console.log("chatroommain is born");

        return () => {
            console.log("chatroom died :( ");
        };
    }, []);

    useEffect(() => {
        console.log("chatroomMain: a change in messages");

        return () => {
            console.log("messages cleanup");
        };
    }, [gameroomState.users]);



    return (
        <div className="chatroom__main">
            <div>
                {!!gameroomState &&
                <h3> Room Name: {gameroomState.id}</h3> 
                }
                {/* {gameroomState?.boardData.map((tile, i) => (
                    <div  className="chatroom__main_tile"key={i}>
                        {tile}
                    </div>
                        
                )) } */}
            </div>
        </div>
    );
};

export default GameroomMain;