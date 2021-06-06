import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Checkbox,
  Card,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  CardContent,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  noneText: {
    padding: "41%",
    paddingBottom: "55%",
  },
  button: {
    display: "inline-block",
    marginLeft: "15px",
    marginTop: "10px",
  },
  btnDisappear: {
    visibility: "hidden",
  },
  title: {
    float: "left",
    display: "inline-block",
    marginTop: "10px",
    marginLeft: "10px",
  },
});

const EventsPage = ({ chosenAddressId }) => {
  const [addressEvents, setAddressEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [checkedEvents, setCheckedEvents] = useState([0]);

  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    const getAddressesEvents = async (chosenAddress) => {
      const response = await fetch(
        `http://localhost:5000/addresses/${chosenAddress}/events`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    };

    if (chosenAddressId) {
      getAddressesEvents(chosenAddressId)
        .then((data) => {
          setAddressEvents(data);
          setCheckedEvents([]);
          setSelectedEvents([]);
        })
        .catch((error) => console.error(error));
    }
  }, [chosenAddressId]);

  const handleComparison = () => {
    history.push({
      pathname: "/differ",
      state: { chosenEvents: selectedEvents },
    });
  };

  const handleToggle = (addrEvntId) => () => {
    const currentIndex = checkedEvents.indexOf(addrEvntId);
    const newChecked = [...checkedEvents];
    const newSelectedEvents = [...selectedEvents];
    const currAddrEvnt = addressEvents.find((event) => event.id === addrEvntId);

    if (currentIndex === -1) {
      if (newChecked.length < 2) {
        newChecked.push(addrEvntId);
        newSelectedEvents.push(currAddrEvnt);
      }
    } else {
      const selectEventIndex = newSelectedEvents.findIndex(item => item.id === addrEvntId);
      newChecked.splice(currentIndex, 1);
      newSelectedEvents.splice(selectEventIndex, 1);
    }

    setSelectedEvents(newSelectedEvents);
    setCheckedEvents(newChecked);
  };

  const displayEvents = () => {
    if (chosenAddressId === "") {
      return <p className={classes.noneText}>None Selected</p>;
    } else {
      return (
        <Card>
          <CardContent>
          {addressEvents.map((addressEvnt) => {
            return (
              <ListItem
                key={addressEvnt.id}
                button
                onClick={handleToggle(addressEvnt.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedEvents.indexOf(addressEvnt.id) !== -1}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText
                  id={`addr-evnt-${addressEvnt.id}`}
                  primary={addressEvnt.type}
                  secondary={addressEvnt.created_at}
                />
              </ListItem>
            );
          })}
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <div>
      <Paper variant="outlined" square>
        <Typography variant="h6" className={classes.title}>
          Events
        </Typography>
        <Button
          disabled={selectedEvents.length < 2 ? true : false}
          onClick={handleComparison}
          variant="contained"
          className={
            chosenAddressId === "" ? classes.btnDisappear : classes.button
          }
        >
          Compare
        </Button>
        {displayEvents()}
      </Paper>
    </div>
  );
};

export default EventsPage;
