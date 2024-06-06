import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, getUserAlbums, getAlbumPhotos } from "../../services";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useLoader } from "../../context/LoaderContext";

const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const userData = await getUser(userId);
      setUser(userData);
      const userAlbums = await getUserAlbums(userId);

      const albumsWithPhotos = await Promise.all(
        Array.isArray(userAlbums) &&
          userAlbums.map(async (album) => {
            const photos = (await getAlbumPhotos(album.id)) || [];
            return {
              ...album,
              thumbnailUrl: photos[0]
                ? photos[0].thumbnailUrl
                : "https://via.placeholder.com/150",
              photosCount: photos.length,
            };
          })
      );

      setAlbums(albumsWithPhotos);
      setLoading(false);
    };

    fetchUserData();
  }, [userId, setLoading]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user?.username}&apos;s Albums
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total Albums: {albums.length}
      </Typography>
      <Grid container spacing={4}>
        {albums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <Card raised>
              <CardActionArea onClick={() => navigate(`/album/${album.id}`)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={album.thumbnailUrl}
                  alt={album.title}
                />
                <CardContent sx={{ height: 60 }}>
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                    {album.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Number of Photos: {album.photosCount}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserPage;
