import socketio, { Socket } from "socket.io-client";
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// import { getRoomData } from '../server/db';
import { LoginContext } from './LoginContext';
export const GameroomContext = createContext();


const GameroomContextProvider = (props) => {
    const [gameroomState, gameroomDispatch] = useState({isRoomExist: true, name: "Test", users: []});
    const { userData } = useContext(LoginContext);

    const [socket, setSocket] = useState(socketio.connect(''))
    const [connectSocket, setConnectSocket] = useState(false)
    const [authSocket, setAuthSocket] = useState(true)
    const [socketID, setSocketID] = useState('')

    useEffect(() => {
        console.log('gameroomState updated,',gameroomState.users)

    }, [gameroomState])

    useEffect(() => {
        if(connectSocket === true){
            console.log('connecting socket')
            const socket = socketio.connect('http://localhost:3001/')
            setSocket(socket)
            setAuthSocket(false)
            console.log(socket)
            setConnectSocket(false)
        }
    }, [userData.token, connectSocket]);

    useEffect(() => {
        if(authSocket === false){
            socket.emit('auth', userData.token)
            setAuthSocket(true)
        }   
    },[userData.token, authSocket, socket, socketID])

    useEffect(() => {
        socket.on('roomData', (roomData)=>{
            console.log('data', roomData)
            gameroomDispatch({isRoomExist: true, name: roomData.name, users: roomData.users})
        })

    })







    return (
        <GameroomContext.Provider value={ { gameroomState, gameroomDispatch, connectSocket, setConnectSocket, socket } }>
            { props.children }
        </GameroomContext.Provider>
    );
};

export default GameroomContextProvider;