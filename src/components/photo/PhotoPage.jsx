import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotoById, updatePhotoTitle } from "../../services";
import { Box, TextField, Button, Typography } from "@mui/material";

const PhotoPage = () => {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      const data = await getPhotoById(photoId);
      setPhoto(data);
      setTitle(data.title);
    };

    fetchPhoto();
  }, [photoId]);

  const handleSave = async () => {
    const updated = await updatePhotoTitle(photoId, title);
    if (updated) {
      setPhoto({ ...photo, title: updated.title });
      alert("Title updated successfully!");
    } else {
      alert("Failed to update the title.");
    }
  };

  if (!photo) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Photo: {photo.title}
      </Typography>
      <img
        src={photo.url}
        alt={photo.title}
        style={{ maxWidth: "100%", height: "auto", maxHeight: 400 }}
      />
      <TextField
        label="Edit Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button onClick={handleSave} color="primary" variant="contained">
        Save
      </Button>
      <Button
        onClick={() => navigate(-1)}
        color="secondary"
        variant="contained"
      >
        Back
      </Button>
    </Box>
  );
};

export default PhotoPage;
