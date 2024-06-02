import React, { useEffect, useState } from "react";
import { getUsers, getAllAlbums } from "../../services/index";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    const fetchAlbums = async () => {
      const data = await getAllAlbums();
      setAlbums(data);
    };

    fetchUsers();
    fetchAlbums();
  }, []);

  return (
    <Grid container>
      <Typography variant="h2">User List</Typography>
      {users.map((user) => (
        <li key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </Grid>
  );
};

export default HomePage;
