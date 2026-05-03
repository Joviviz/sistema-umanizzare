import styles from "./styles.module.css";

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
              <a href="#inicio" className={styles.navLink}>Início</a>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}