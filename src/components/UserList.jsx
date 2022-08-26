import { useEffect, useState } from "react";
import { fetchUsers } from "../api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(({ users }) => {
        setUsers(users);
      })
      .catch(() => {
        setErr("Oops! Something went wrong...");
      });
  },[]);
  if (err) return <p>{err}</p>;
  return (
    <section className="users">
      <h2>Users</h2>
      {users.map(({ username, name, avatar_url }, index) => {
        return (
          <section className="user-list" key={index}>
            <img
              src={avatar_url}
              alt="Users profile avatar"
              className="user-avatar"
            />
            <section className="user-info">
              <p className="user-name">{name}</p>
              <p className="user-username">Username: {username}</p>
            </section>
          </section>
        );
      })}
    </section>
  );
};

export default UserList;
