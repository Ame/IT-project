import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthService from "../../services/auth.service";

const PrivateRoute = ({component: Component, ...rest}) => {

    // checks if there is a user currently logged in
    const isLoggedIn = AuthService.isLoggedIn();
    
    return (
        // Show the component only when the user is logged in, otherwise redirect to the login page
        <Route {...rest} render={props =>
            isLoggedIn ? (
            <Component {...props} /> )
            : <Redirect to='/' />
        } />

    );
}

export default PrivateRoute;