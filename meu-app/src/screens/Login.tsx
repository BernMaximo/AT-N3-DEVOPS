import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Salva dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date(),
      });

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/upload");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <h2>Login com Google</h2>
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
    </div>
  );
};

export default Login;
