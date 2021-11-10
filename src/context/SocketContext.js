// import socketio, { Socket } from "socket.io-client";
// import { createContext, useState, useEffect, useContext } from 'react';
// import { LoginContext } from './LoginContext';
// // import { GameroomContext } from './GameRoomContext'
// // import { ws } from '../server/socket'

// export const SocketContext = createContext();

// const SocketContextProvider = (props)=>{
//     const { userData } = useContext(LoginContext);
//     const [gameroomState, gameroomDispatch] = useState({isRoomExist: true, name: "Main", users: []})

//     const [socket, setSocket] = useState(Socket)
//     const [connectSocket, setConnectSocket] = useState(false)
//     const [authSocket, setAuthSocket] = useState(true)
//     const [socketID, setSocketID] = useState('')
//     console.log(socket)
//     useEffect(() => {
//         if(connectSocket === true){
//             console.log('connecting socket')
//             const socket = socketio.connect('http://localhost:3001/')
//             setSocket(socket)
//             setAuthSocket(false)
//             console.log(socket)
//         }
//         setConnectSocket(false)
//     }, [userData.token, connectSocket]);

//     useEffect(() => {
//         if(authSocket === false){
//             // setSocketID(socket.id)
//             socket.emit('auth', userData.token)
//             setAuthSocket(true)
//         }   
//     },[userData.token, authSocket, socket, socketID])

//     // useEffect(() => {
//     //     console.log('data')

//     // },[gameroomDispatch, socket, authSocket])

//     // socket.on('roomData', (roomData)=>{
//     //     console.log('data', roomData)
//     //     gameroomDispatch({isRoomExist: true, name: roomData.name, users: roomData.users})
//     // })



//     return (
//         <SocketContext.Provider value={ { connectSocket, setConnectSocket } }>
//             { props.children }
//         </SocketContext.Provider>
//     );
// }

// export default SocketContextProvider