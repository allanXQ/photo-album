import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAlbumById, getAlbumPhotos } from "../../services";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumData = await getAlbumById(albumId);
      setAlbum(albumData);
      const albumPhotos = await getAlbumPhotos(albumId);
      setPhotos(albumPhotos);
    };

    fetchAlbumData();
  }, [albumId]);

  if (!album) return <Typography>Loading album data...</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Photos in "{album[0].title}"
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Total Photos: {photos.length}
      </Typography>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
            <Card raised>
              <CardActionArea onClick={() => navigate(`/photo/${photo.id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.url}
                  alt={photo.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="body1" noWrap>
                    {photo.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link
        to="/home"
        style={{ marginTop: 20, display: "block", textDecoration: "none" }}
      >
        <Typography variant="button">Back to Home</Typography>
      </Link>
    </Box>
  );
};

export default AlbumPage;
