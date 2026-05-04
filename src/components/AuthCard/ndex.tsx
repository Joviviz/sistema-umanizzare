import styles from "./styles.module.css";
import logo from "../../assets/images/brand.png";

interface AuthCardProps {
title: string;
children: React.ReactNode;
}

export function AuthCard({ title, children }: AuthCardProps) {
return (
<div className={styles.card}>
<div className={styles.logoCircle}>
<img src={logo} alt="Umanizzare" className={styles.logoImage} />
</div>
<h1 className={styles.title}>{title}</h1>
{children}
</div>
);
}