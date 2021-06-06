import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles({
  selectedAddressCard: {
    backgroundColor: '#cfcfcf',
    boxShadow: '2px 2px #B0B0B0'
  },
  addressCard: {
    cursor: "pointer",
  },
  noneText: {
    padding: "35%",
  },
  title: {
    marginTop: "10px",
    marginLeft: "10px",
    marginBottom: "10px"
  },
  paper: {
    marginLeft: "10px",
    marginBottom: "10px",
    paddingLeft: "15px",
    paddingBottom: "5px",
    paddingRight: "15px"
  }
});

const AddressPage = ({ chosenUser, onChange }) => {
  const [addresses, setAddresses] = useState([]);
  const [addressSectionSelect, setAddressSectionSelect] = useState("");

  const classes = useStyle();

  const handleOnClickAddressInfo = (addressId) => {
    onChange(addressId);
    setAddressSectionSelect(addressId);
  };

  useEffect(() => {
    const getUserAddresses = async (userId) => {
      const response = await fetch(
        `http://localhost:5000/users/${userId}/addresses`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    };

    if (chosenUser) {
      getUserAddresses(chosenUser)
        .then((data) => setAddresses(data))
        .catch((error) => console.error(error));
    }
  }, [chosenUser]);

  const displayAddresses = () => {
    if (chosenUser === "") {
      return <p className={classes.noneText}>None Selected</p>;
    } else {
      return addresses.map((address, key) => {
        return (
          <Paper
            className={
              (addressSectionSelect === address.id
                ? classes.selectedAddressCard
                : classes.addressCard)
            }
            style={{marginBottom: 10}}
            variant="outlined"
            square
            onClick={() => handleOnClickAddressInfo(address.id)}
            key={key}
          >
            <pre>{JSON.stringify(address, null, 2).replace(/[,{}]/g, "")}</pre>
          </Paper>
        );
      });
    }
  };

  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Address Information
      </Typography>
      {displayAddresses()}
    </Paper>
  );
};

export default AddressPage;
