import React from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ role, component:Component, ...rest }) => {
  try {
    const response = localStorage.getItem("user");
    const data = JSON.parse(response);
    console.log(data)
    return <Route
    {...rest}
    render={(props) =>
      data!= null && data.role === role  ? <Component {...props} /> : <Redirect to="/login" />
    }
  />

  } catch (e) {
    return <Redirect to="/login" />;

  }
};

export default PrivateRoute;
