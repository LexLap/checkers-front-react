import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserFromCookie } from '../cookies/cookies';
export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const cookieUserData = getUserFromCookie();
    // const [userData, dispatchUserData] = useState(cookieUserData || { user: null, token: "" });
    const [userData, dispatchUserData] = useState({ user: null, token: "" });

    return (
        <LoginContext.Provider value={ { userData, dispatchUserData } }>
            {props.children }
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;