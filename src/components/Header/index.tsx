import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export function Header() {
  const location = useLocation();

  // Função auxiliar para verificar qual aba está ativa na URL
  const isActive = (path: string) => location.pathname === path ? styles.active : "";

  return (
    <aside className={styles.sidebar}>
      {/* Área da Logo no topo da barra lateral */}
      <div className={styles.logoArea}>
        <img src={logo} alt="Umanizzare" className={styles.logoImage} />
        <h1 className={styles.brandName}>Umanizzare</h1>
      </div>

      {/* Menu de Navegação Vertical */}
      <nav className={styles.nav}>
        <Link to="/" className={`${styles.navLink} ${isActive("/")}`}>
          inicio
        </Link>
        <a href="#pacientes" className={styles.navLink}>
          pacientes
        </a>
        <a href="#documentos" className={styles.navLink}>
          Documentos
        </a>
        <a href="#consultas" className={styles.navLink}>
          relatórios
        </a>
        <a href="#sobre" className={styles.navLink}>
          Sobre nos
        </a>
        <Link to="/login" className={styles.navLink}>
          Configuração
        </Link>
        <Link to="/register" className={styles.navLink}>
          Cadastro
        </Link>
      </nav>
    </aside>
  );
}