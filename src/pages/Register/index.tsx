import styles from './Register.module.css'; // Vamos criar esse CSS separado para o Registro
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";

export function Register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Cadastro enviado");
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
        <h2>Cadastro</h2>
      </div>

      {/* SEÇÃO FORMULÁRIO (DIREITA) */}
      <div className={styles.formSection}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <h3>Crie sua conta</h3>
            <p>Preencha os dados para acessar a plataforma</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input type="text" placeholder="Digite seu nome completo" required />
            </div>

            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input type="email" placeholder="Digite seu melhor e-mail" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input type="password" placeholder="Crie uma senha forte" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirmar Senha</label>
              <input type="password" placeholder="Repita a senha criada" required />
            </div>

            <button type="submit" className={styles.btnCadastrar}>
              Cadastrar
            </button>
          </form>

          <p className={styles.footerLink}>
            Já tem uma conta? <Link to="/login">Faça o Login</Link>
          </p>
        </div>
      </div>

    </div>
  );
}