import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from '../components/main/Header';
import LoginPage from '../components/login/LoginPage';
import PageNotFound from '../components/main/PageNotfound';
import GameroomLoader from '../components/gameroom/GameroomLoader';
import LoginContextProvider from '../context/LoginContext';
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRoute';
import SocketContextProvider from '../context/SocketContext';
import GameroomContextProvider from '../context/GameRoomContext';

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
        {/* <SocketContextProvider> */}
            <GameroomContextProvider>
                
                    <Header />
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to="/home" />
                            </Route>
                            <PrivateRoute path="/home" component={ GameroomLoader }/>
                            <LoginRoute path="/login" component={ LoginPage } />
                            <Route path="*" component={ PageNotFound } />
                        </Switch>
               
            </GameroomContextProvider>
        
            {/* </SocketContextProvider> */}
        </LoginContextProvider>
    </BrowserRouter>
)

export default AppRouter;