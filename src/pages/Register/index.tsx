import { Link } from 'react-router-dom'
import { AuthCard } from "../../components/AuthCard";
import styles from './styles.module.css'

export function Register() {
  return (
    <main className={styles.page}>
    <AuthCard title="Registro">
      <div className={styles.form}>
        <input className={styles.input} type="email"    placeholder="Email" />
        <input className={styles.input} type="email"    placeholder="Confirmar Email" />
        <input className={styles.input} type="password" placeholder="Senha" />
        <input className={styles.input} type="password" placeholder="Confirmar senha" />
        <button className={styles.button}>Entrar</button>
        <p className={styles.footerText}>
          <Link to="/login">Já sou cadastrado</Link>
        </p>
      </div>
    </AuthCard>
    </main>
  )
}