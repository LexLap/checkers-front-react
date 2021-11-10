import Axios from 'axios'

// console.log('dbg', socket.id)
// export const socket = socketIOClient('http://localhost:3001/')

export const subscribeToSite = async (email, password) => {
    try {
        const res = await Axios.post(
            'http://localhost:3001/subscribe',
            {email, password, returnSecureToken: true}
        )
        // socket.emit('auth', res.data.token, socket.id)

        return {
            token: res.data.token,
            user: { username: res.data.user.username, id: res.data.user.id }
        }

    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error(err.response.data);
        }
    }
}

export const loginToSite = async (email, password) => {
    try {
        const res =  await Axios.post(
            'http://localhost:3001/login',
            { email, password, returnSecureToken: true }
        )
        // socket.emit('auth', res.data.token, socket.id)
        return {
            token: res.data.token,
            user: { username: res.data.user.username, id: res.data.user.id },
        }
    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error(err.response.data);
        }
    }
}

export const logOut = async (token) => {
    try {
        await Axios.post(
            'http://localhost:3001/logout',
            { token }
        )

        // socket.emit('logout')

    } catch (err) {
        if (err.response && err.response.status === 400) {
            throw new Error(err.response.data);
        }
    }
}

      
