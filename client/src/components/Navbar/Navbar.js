import React, { useState, useEffect, useCallback } from "react";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import nigerianFlag from "../../images/nigerian-flag.jpg";
import useStyles from "./styles";
import { LOGOUT } from "../../actions/types";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = user?.token;

  const handleLogout = useCallback(() => {
    dispatch({ type: LOGOUT });
    setUser(null);
    history.push("/");
  }, [dispatch, history]);

  // () => {
  //   dispatch({ type: LOGOUT });
  //   setUser(null);
  //   history.push("/");
  // };

  useEffect(() => {

    if (!token) return 

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, token, handleLogout]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          variant="h2"
          align="center"
          className={classes.heading}
        >
          Cute Places
        </Typography>
        <img
          src={nigerianFlag}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </div>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.profileInfo.name}
              src={user.profileInfo.imageUrl}
            >
              {user.profileInfo.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.profileInfo.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
