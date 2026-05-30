import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/images/brand.png";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("@Umanizzare:token");
  const userName = localStorage.getItem("@Umanizzare:name") || "Usuário";
  const userLoggedRole = localStorage.getItem("@Umanizzare:role") || "USER";

  const isAdm = userLoggedRole === "ADMIN";
  const isAuthenticated = !!token;

  function handleLogout() {
    localStorage.removeItem("@Umanizzare:token");
    localStorage.removeItem("@Umanizzare:role");
    localStorage.removeItem("@Umanizzare:name");

    navigate("/login");
    window.location.reload();
  }

  const isActive = (path: string) => (location.pathname === path ? styles.active : "");

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <img src={logo} alt="Umanizzare" className={styles.logoImage} />
        <h1 className={styles.brandName}>Umanizzare</h1>
      </div>

      <nav className={styles.nav}>
        <Link to="/" className={`${styles.navLink} ${isActive("/")}`}>
          Início
        </Link>

        {isAdm && (
          <Link
            to="/admin/users"
            className={`${styles.navLink} ${isActive("/admin/users")}`}
          >
            Painel Admin
          </Link>
        )}

        <a href="#pacientes" className={styles.navLink}>
          Pacientes
        </a>
        <a href="#documentos" className={styles.navLink}>
          Documentos
        </a>
        <a href="#consultas" className={styles.navLink}>
          Relatórios
        </a>

        {isAuthenticated ? (
          <>
            <span 
              className={styles.navLink} 
              style={{ cursor: "default", opacity: 0.8, fontSize: "1rem" }}
            >
              Olá, {userName}
            </span>
            <button
              onClick={handleLogout}
              className={styles.navLink}
              style={{ border: "none", textAlign: "left", cursor: "pointer" }}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`${styles.navLink} ${isActive("/login")}`}>
              Login
            </Link>
            <Link to="/register" className={`${styles.navLink} ${isActive("/register")}`}>
              Cadastro
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}