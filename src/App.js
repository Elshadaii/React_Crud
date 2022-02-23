import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJob from "./components/add-job.component";
import Job from "./components/job.component";
import JobsList from "./components/jobs-list.component";
import PrivateRoute from "./components/private_route";
import Login from './components/login.component'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './actions/auth'
import Register from './components/register.component'
const App  = (props)=> {
  const history  = useHistory()

  const logout = (e)=>{
    props._logout()
    history.push('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/jobs"} className="navbar-brand">Molto </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/jobs"} className="nav-link">
              jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          {props.auth.isLoggedIn &&
          <li>
            <button onClick={logout} >
              logout
            </button>
          </li>
        }
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/jobs"]} component={JobsList} />
          <PrivateRoute exact role="Job Recruiter" path="/add" component={AddJob } />
          <PrivateRoute exact role="Job Recruiter" path="/jobs/:id" component={Job} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register}/>
        </Switch>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch)=>{
  return {
    _logout: ()=>dispatch(logout())
  }
}

const mapStateToProps = (state)=>{
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

