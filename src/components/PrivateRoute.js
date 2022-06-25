import React, { useContext } from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(authContext);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                auth.data ? (
                    <Component {...routeProps} />
                ) : (
                    <Navigate replace to="/sign-in" />
                )
            }
        />
    );
    /*  we are spreading routeProps to be able to access this routeProps in the component. */
};

export default PrivateRoute;
