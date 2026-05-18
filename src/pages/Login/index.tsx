import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";

export function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      
      {/* SEÇÃO VINHO (ESQUERDA) */}
      <div className={styles.sidebar}>
        <div className={styles.logoArea}>
           <img src={logo} alt="Logo Umanizzare" />
           <h1>Umanizzare</h1>
           <h3>INSTITUTO</h3>
        </div>
        <h2>Login</h2>
      </div>

      {/* SEÇÃO FORMULÁRIO (DIREITA) */}
      <div className={styles.formSection}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <h3>Bem vindo de volta</h3>
            <p>Entre para acessar a plataforma</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input type="email" placeholder="Digite seu e-mail" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" required />
            </div>

            <a href="#" className={styles.forgotPassword}>esqueceu a senha?</a>

            <button type="submit" className={styles.btnEntrar}>
              Entrar
            </button>
          </form>

          <p className={styles.footerLink}>
            Novo por aqui? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>

    </div>
  );
}