import React from "react";
import { NavLink } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";

const activeStyle = { color: "orange" };

const useStyles = makeStyles({
	root: {
		float: "right",
		display: "inline-block",
		marginRight: "15px"
	},
	title: {
		display: "inline-block",
		marginLeft: "10px"
		
	},
	nav: {
		borderBottom: "2px solid gray",
		borderTop: "2px solid gray",
		marginTop: "20px",
		paddingBottom: "10px",
		paddingTop: "5px",
		marginBottom: "20px"
	},
	link: {
		textDecoration: 'none',
	}
  });

const Navbar = () => {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <Typography variant="h5" className={classes.title}>Noyo Front End Coding Challenge</Typography>
      <Typography variant="h6" className={classes.root}>
        <NavLink to="/" activeStyle={activeStyle} className={classes.link} exact>
          Home
        </NavLink>
        {" | "}
        <NavLink to="/differ" activeStyle={activeStyle} className={classes.link}>
          Differences
        </NavLink>
      </Typography>
    </nav>
  );
};

export default Navbar;
