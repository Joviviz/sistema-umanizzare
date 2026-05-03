import styles from "./styles.module.css";
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <a href="#" className={styles.brand}>
          <span className={styles.brandName}>Umanizzare</span>
        </a>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to='/' className={styles.navLink}>Início</Link>
            </li>
            <li>
              <a href="#pacientes" className={styles.navLink}>Pacientes</a>
            </li>
            <li>
              <a href="#documentos" className={styles.navLink}>Documentos</a>
            </li>
            <li>
              <a href="#consultas" className={styles.navLink}>Consultas</a>
            </li>
            <li>
              <a href="#sobre" className={styles.navLink}>Sobre nós</a>
            </li>
            <li>
              <Link to='/login' className={styles.navLink}>Login</Link>
            </li>
            <li>
              <Link to='/register' className={styles.navLink}>Cadastro</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}