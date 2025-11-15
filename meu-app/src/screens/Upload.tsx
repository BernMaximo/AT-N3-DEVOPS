import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  // Buscar todos os usuários cadastrados
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const list: any[] = [];
      querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setUsers(list);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Área de Upload</h2>
      <button onClick={handleLogout}>Sair</button>

      <hr />

      <h3>Usuários Registrados</h3>
      <ul style={{ textAlign: "left" }}>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
};

export default Upload;