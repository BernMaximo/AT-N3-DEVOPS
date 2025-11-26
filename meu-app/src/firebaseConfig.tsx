import React, { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//AI
import { getAI, getGenerativeModel, GoogleAIBackend, AI } from "firebase/ai";
//FIRESTORE
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCznMlN-_Syr1LrSl4UepKtVbiRxXypQ-k",
  authDomain: "atividade-yuri.firebaseapp.com",
  projectId: "atividade-yuri",
  storageBucket: "atividade-yuri.firebasestorage.app",
  messagingSenderId: "383429968180",
  appId: "1:383429968180:web:a8984f547a870223b36561",
  measurementId: "G-DHZ1Y15JCM"
};

// Inicializa Firebase (somente uma vez)
const app = initializeApp(firebaseConfig);
// Inicializa Gemini via Firebase AI SDK
const ai = getAI(app, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });
// Autenticação
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Firestore
const db = getFirestore(app);

export default function AIBox(): JSX.Element {
  const [q, setQ] = useState("");
  const [r, setR] = useState("");
  const [loading, setLoading] = useState(false);
  const [lock, setLock] = useState(false);

  const ask = async () => {
    setLoading(true);
    try {
      const result: any = await model.generateContent(q);
      // result.response.text() may be a function that returns a Promise (like fetch Response)
      let text = "";
      if (result?.response && typeof result.response.text === "function") {
        text = await result.response.text();
      } else if (result?.response) {
        text = String(result.response);
      } else {
        text = String(result ?? "");
      }
      setR(text);
      setLock(true);
    } catch (err) {
      setR(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      input:{" YES "}
      <input
        type="text"
        value={q}
        onChange={(e) => setQ((e.target as HTMLInputElement).value)}
      />
      <button onClick={ask} disabled={loading || lock}>
        {loading ? "Loading..." : "Ask"}
      </button>
      <div>{r}</div>
    </div>
  );
}

export { auth, provider, db, AIBox };
