import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";

export function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
            <div className={styles.logoCircle}>
                <img src={logo} alt="Logo Umanizzare" className={styles.logoImage} />
            </div>
        </div>

        <h1 className={styles.title}>Cadastro</h1>

        <form className={styles.form}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="email" placeholder="Confirmar Email" className={styles.input} />
          <input type="password" placeholder="Senha" className={styles.input} />
          <input type="password" placeholder="Confirmar senha" className={styles.input} />

          <button type="submit" className={styles.button}>Entrar</button>
        </form>

        <Link to="/login" className={styles.link}>
          Já sou cadastrado
        </Link>
      </div>
    </div>
  );
}