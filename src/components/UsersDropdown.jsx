import React, {useEffect, useState} from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const UsersDropdown = ({ onChange }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  const useStyles = makeStyles({
    formControl: {
      marginLeft: 10,
      marginBottom: 18,
      minWidth: 200,
    }
  });

  const classes = useStyles();

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`http://localhost:5000/user_ids`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    };

    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Select User ID</InputLabel>
        <Select
          labelId="user-id-select-label"
					id="user-id-select"
          value={selectedUser}
          onChange={handleChange}
          label="Select User ID"
        >
          {users.map((user) => (
            <MenuItem
              key={user}
              value={user}
              onClick={() => setSelectedUser(user)}
            >
              {user}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default UsersDropdown;
