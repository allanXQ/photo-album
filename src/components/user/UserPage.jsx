import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser, getUserAlbums } from "../../services";

const UserPage = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(userId);
      setUser(data);
    };

    const fetchAlbums = async () => {
      const data = await getUserAlbums(userId);
      setAlbums(data);
    };
    fetchUser();
    fetchAlbums();
  }, [userId]);

  console.log(userId);

  return (
    <div>
      <h1>User Albums</h1>
      <p>Total Albums: {albums.length}</p>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/home">Back to Home</Link>
    </div>
  );
};

export default UserPage;
