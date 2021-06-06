import React from "react";
import _ from "lodash";
import { Box, Paper, Grid, Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 16,
    marginLeft: 10,
  },
  link: {
    textDecoration: "none",
  },
  grid: {
    marginTop: theme.spacing(2),
    marginLeft: 10,
  },
  events: {
    textAlign: "center",
    fontSize: 60,
    backgroundColor: "darkgray",
    marginLeft: 10,
    marginRight: 10,
    padding: 225,
    marginTop: 20,
  },
}));

const DifferPage = (props) => {
  const classes = useStyles();
  let chosenEvents = null;

  const displayDiffs = () => {
    if (!_.has(props.location.state, "chosenEvents")) {
      return <p className={classes.events}>DIFF VIEWER</p>;
    } else {
      chosenEvents = props.location.state.chosenEvents;
      return (
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={6}>
            <Paper variant="outlined" square>
              <pre>
                {JSON.stringify(chosenEvents[0], null, 2).replace(/[,{}]/g, "")}
              </pre>
            </Paper>
          </Grid>
          <Grid item xs={6} style={{ paddingRight: 30 }}>
            <Paper variant="outlined" square>
              <pre>
                {JSON.stringify(chosenEvents[1], null, 2).replace(/[,{}]/g, "")}
              </pre>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <div>
      <Box className={classes.container}>
        <Link to="/" className={classes.link}>
          <Button variant="contained" color="secondary">
            Go Back
          </Button>
        </Link>
      </Box>
      {displayDiffs()}
    </div>
  );
};

export default DifferPage;
