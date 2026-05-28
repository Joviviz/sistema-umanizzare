import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/brand.png";

export function Header() {
  const navigate = useNavigate();

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

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.brand}>
          <div className={styles.logoCircle}>
            <img src={logo} alt="Umanizzare" className={styles.logoImage} />
          </div>
          <span className={styles.brandName}>Umanizzare</span>
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/" className={styles.navLink}>
                Início
              </Link>
            </li>

            {isAdm && (
              <li>
                <Link
                  to="/admin/users"
                  className={`${styles.navLink} ${styles.adminLink}`}
                >
                  PAINEL ADMIN
                </Link>
              </li>
            )}

            <li>
              <Link to="/" className={styles.navLink}>
                Pacientes
              </Link>
            </li>

            <li>
              <Link to="/" className={styles.navLink}>
                Documentos
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.navLink}>
                Consultas
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.navLink}>
                Sobre nós
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className={styles.userInfo}>
                  <span className={styles.userName}>Olá, {userName}</span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className={`${styles.navLink} ${styles.logoutButton}`}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className={styles.navLink}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className={styles.navLink}>
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
