import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";
import styles from "./styles.module.css";
import { apiService } from "../../services/api"; 

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const data = await apiService.login({ email, password });

      if (data.token) {
        localStorage.setItem("@Umanizzare:token", data.token);
      }

      console.log("Login feito com sucesso!", data);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main className={styles.page}>
      <AuthCard title="Login">
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <span className={styles.errorMessage}>{error}</span>}

          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/forgot-password" className={styles.forgot}>
            Esqueceu a senha?
          </Link>

          <button type="submit" className={styles.button}>
            Entrar
          </button>

          <p className={styles.footerText}>
            Novo por aqui? <Link to="/register">Cadastre-se</Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}