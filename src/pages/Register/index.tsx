import { Link, useNavigate } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";
import styles from "./styles.module.css";
import { useState } from "react";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email || !name || !confirmEmail || !password || !confirmPassword || !role) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (email !== confirmEmail) {
      setError("Os e-mails informados não coincidem");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas não coincidem");
      return;
    }

    try {
      const response = await fetch("http://147.93.9.44:8002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          role: role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao realizar o cadastro");
      }

      console.log("Usuário registrado com sucesso!", data);
      alert("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Não foi possível conectar ao servidor.");
      }
    }
  }

  return (
    <main className={styles.page}>
      <AuthCard title="Cadastro">
        <form onSubmit={handleRegister} className={styles.form}>
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
            type="email"
            placeholder="Confirmar Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />

          <input
            className={styles.input}
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">Paciente USER</option>
            <option value="ADM">Administrador ADM</option>
          </select>

          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className={styles.button}>
            Cadastrar
          </button>

          <p className={styles.footerText}>
            Já tem uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </form>
      </AuthCard>
    </main>
  );
}
