import { useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState("");

  const history = useNavigate();
  async function registerUser(event) {
    event.preventDefault();
    setQuote("");
    const response = await fetch(
      "http://localhost:1337/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
          quote,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log(data);

    if (data.status === "ok") {
      history("/login");
    }
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={registerUser}>
        <div className={styles.row}>
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Registrar</Button>
        </div>
      </form>
    </main>
  );
}

export default App;
