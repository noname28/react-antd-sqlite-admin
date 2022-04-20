import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLoginls } from '../utils/utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoginls() && restricted ?
                <Navigate to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;