import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlbumById, getAlbumPhotos } from "../../services";

const AlbumPage = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState();

  useEffect(() => {
    const fetchPhotos = async () => {
      const data = await getAlbumPhotos(albumId);
      setPhotos(data);
    };

    const fetchAlbum = async () => {
      const data = await getAlbumById(albumId);
      setAlbum(data);
    };
    fetchAlbum();
    fetchPhotos();
  }, [albumId]);

  console.log(photos);

  return (
    <div>
      <h1>Photos in Album</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {photos.map((photo) => (
          <div key={photo.id}>
            <Link to={`/photo/${photo.id}`}>
              <img
                src={photo.url}
                alt={photo.title}
                style={{ width: "100%" }}
              />
              <p>{photo.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default AlbumPage;
