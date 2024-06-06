import { useEffect, useState } from "react";
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
import { useLoader } from "../../context/LoaderContext";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    const fetchAlbumData = async () => {
      setLoading(true);
      const albumData = await getAlbumById(albumId);
      setAlbum(albumData);
      const albumPhotos = await getAlbumPhotos(albumId);
      setPhotos(albumPhotos);
      setLoading(false);
    };

    fetchAlbumData();
  }, [albumId]);

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Photos in "{Array.isArray(album) && album[0].title}"
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
