import React, { useContext, useEffect, useState } from 'react';
import { GameroomContext } from '../../context/GameRoomContext';
import SendInvite from './SendInvite';
import RespondInvite from './RespondInvite'
import SearchUsers from './SearchUsers';
import { LoginContext } from '../../context/LoginContext';
// import { SocketContext } from '../../context/SocketContext'

const GameroomUsers = (props) => {
    const { gameroomState, gameroomDispatch, socket } = useContext(GameroomContext);
    const [usersToDisplay, setUsersToDisplay] = useState([...gameroomState.users]);
    const [privateMessageUser, setPrivateMessageUser] = useState(null);
    const [initiatorUsername, setInitiatorUsername] = useState(null);
    const [initiatorSocket, setInitiatorSocket] = useState(null)
    const { userData } = useContext(LoginContext)

    socket.on('roomData', (roomData)=>{
        console.log('data')
        gameroomDispatch({isRoomExist: true, name: roomData.name, users: roomData.users})
    })

    useEffect(() => {
        setUsersToDisplay([...gameroomState.users]);
        console.log('users: ', gameroomState.users, socket.id)
        
    }, [gameroomState.users]);


    const searchUsers = (searchValue) => {
        const users = [...gameroomState.users];
        setUsersToDisplay(searchValue === "" ?
            users :
            users.filter((user) => user.username.toLowerCase().includes(searchValue)));
    };

    const sendPrivateMessage = () => {
        setPrivateMessageUser(null);
    };

    const closeResponseModal = ()=>{
        setInitiatorUsername(null)
    }


    // socket.on('gameInvite', (initiator)=>{
    //     setInitiatorUsername(initiator.username)
    //     setInitiatorSocket(initiator.socketID)
    // })

    
    return (
        <div className="chatroom__users">
            
            
            <h3>Online Users: {usersToDisplay.length}</h3>
            <SearchUsers searchUsers={ searchUsers } />
            {usersToDisplay.map((user) => (
                <div
                    className="user"
                    key={ user.id }
                    onClick={ () => {
                        if(userData.user.username!==user.username){
                            setPrivateMessageUser(user);
                        }
                    } }
                >
                    {user.username}
                    {': '}
                    {user.score}
                    
                </div>
            ))}
            {
                !!initiatorUsername &&
                <RespondInvite
                    initiatorUsername = { initiatorUsername }
                    initiatorSocket = {initiatorSocket}
                    closeResponseModal={ closeResponseModal }
                />
            }
            {
                !!privateMessageUser &&
                <SendInvite
                    user={ privateMessageUser }
                    sendPrivateMessage={ sendPrivateMessage }
                />
            }
        </div>
    );
};

export default GameroomUsers;
