import React, { useState } from "react";
import AddressPage from "./AddressPage";
import EventsPage from "./EventsPage";
import UsersDropdown from "./UsersDropdown";
import { Grid } from "@material-ui/core";

const HomePage = () => {
  const [chosenUser, setChosenUser] = useState("");
  const [chosenAddressId, setChosenAddressId] = useState("");

  const handleChange = (user) => {
    setChosenUser(user);
  };

  const handleChosenAddress = (addressId) => {
    setChosenAddressId(addressId);
  };

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <UsersDropdown onChange={handleChange} />
          <AddressPage chosenUser={chosenUser} onChange={handleChosenAddress} />
        </Grid>
        <hr
          width="1"
          size="20%"
          style={{
            marginLeft: "45px",
            marginRight: "20px",
            backgroundColor: "black",
            border: "none",
          }}
        ></hr>

        <Grid item xs={5}>
          <EventsPage chosenAddressId={chosenAddressId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
