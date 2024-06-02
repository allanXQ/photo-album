import React, { useEffect, useState } from "react";
import { getUsers, getAllAlbums } from "../../services/index";
import { Link } from "react-router-dom";

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
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
