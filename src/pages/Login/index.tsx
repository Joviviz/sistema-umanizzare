import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
   
    <div className={`container-fluid p-0 ${styles.container}`}>
      <div className="row g-0 h-100 w-100">
        
       
        <div className={`col-12 col-lg-5 ${styles.sidebar}`}>
          <div className={styles.logoArea}>
             <img src={logo} alt="Logo Umanizzare" className="img-fluid" /> 
             <h1>Umanizzare</h1>
             <h3>INSTITUTO</h3>
          </div>
          <h2 className="d-none d-lg-block">Login</h2> {}
        </div>
        <div className={`col-12 col-lg-7 ${styles.formSection}`}>
        
          <div className={`w-100 px-3 ${styles.loginCardWrapper}`}>
            <div className={styles.loginCard}>
              <div className={styles.header}>
                <h3>Bem vindo de volta</h3>
                <p>Entre para acessar a plataforma</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label>E-mail</label>
                  <input type="email" placeholder="Digite seu e-mail" className="form-control" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Senha</label>
                  <input type="password" placeholder="Digite sua senha" className="form-control" required />
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

      </div>
    </div>
  );
}