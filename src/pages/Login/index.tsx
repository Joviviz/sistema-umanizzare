import { Link } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";
import styles from "./styles.module.css";

export function Login() {
  return (
    <main className={styles.page}>
      <AuthCard title="Login">
        <div className={styles.form}>
          <input className={styles.input} type="email" placeholder="Email"/>
          <input className={styles.input} type="password" placeholder="Senha"/>
          <Link to="/forgot-password" className={styles.forgot}>Esqueceu a senha?</Link>
          <button className={styles.button}>Entrar</button>
          <p className={styles.footerText}>
            Novo por aqui? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </AuthCard>
    </main>
  );
}
