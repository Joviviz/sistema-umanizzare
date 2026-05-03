import styles from './Login.module.css';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
            <div className={styles.smileyIcon}>:)</div>
        </div>

        <h1 className={styles.title}>Login</h1>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Senha" className={styles.input} />

          <button type="submit" className={styles.button}>Entrar</button>
        </form>

        <Link to="/register" className={styles.link}>
          Ainda não tenho conta
        </Link>
      </div>
    </div>
  );
}