import { useEffect, useState } from "react";
import { getUsers, getAllAlbums } from "../../services";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { useLoader } from "../../context/LoaderContext";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const usersData = await getUsers();
      const albumsData = await getAllAlbums();
      setUsers(usersData);
      setAlbums(albumsData);
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  const getAlbumsCountByUserId = (userId) => {
    return albums.filter((album) => album.userId === userId).length;
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
            <Card raised>
              <CardContent>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "secondary.main",
                    margin: "auto",
                  }}
                >
                  {user.username[0]}
                </Avatar>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {user.username}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textAlign: "center" }}
                >
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Link
                  to={`/user/${user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button size="small" variant="outlined" color="primary">
                    View Albums ({getAlbumsCountByUserId(user.id)})
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
