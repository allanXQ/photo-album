import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotoById, updatePhotoTitle } from "../../services";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    setPhoto(updated);
    alert("Title updated successfully!");
  };

  if (!photo) return <p>Loading...</p>;

  return (
    <div>
      <img src={photo.url} alt={photo.title} style={{ maxWidth: 400 }} />
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
    </div>
  );
};

export default PhotoPage;
