import styles from "./styles.module.css";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>&copy; {currentYear} Sistema Umanizzare - Todos os direitos reservados.</p>
        </footer>
    );
}