import React, { useEffect, useState } from "react";
import { getUsers, getAllAlbums } from "../../services/index";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

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

  const getAlbumsByUserId = (userId) => {
    const userAlbums = albums.filter((album) => album.userId === userId);
    return userAlbums.length;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5">User List</Typography>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          flexFlow: "row wrap",
          // maxWidth: 700,
        }}
      >
        {users.map((user) => (
          <Grid
            item
            sx={{
              minWidth: 300,
            }}
            key={user.id}
          >
            <Card>
              <CardHeader
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
                avatar={
                  <Avatar sx={{ width: 60, height: 60 }}>
                    {user.username[0]}
                  </Avatar>
                }
                title={user.username}
                subheader={`Albums: ${getAlbumsByUserId(user.id)}`}
              />
              <CardContent>
                <Link to={`/user/${user.id}`}>View User</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
