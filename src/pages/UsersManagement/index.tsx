import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { apiService } from "../../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const userLoggedRole = localStorage.getItem("@Umanizzare:role") || "USER";
  const isAdm = userLoggedRole === "ADMIN";

  // PADRÃO RECOMENDADO PELA DOCUMENTAÇÃO DO REACT
  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const data = await apiService.getUsers();
        
        // Só atualiza o estado se o componente ainda estiver montado na tela
        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Não foi possível conectar ao servidor");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    // Função de limpeza (cleanup): roda se o componente desmontar
    return () => {
      isMounted = false;
    };
  }, []); // Mantém o array de dependências vazio para rodar só na montagem

  async function handleToggleRole(id: string, currentRole: "USER" | "ADMIN") {
    if (!isAdm) return;
    const newRole = currentRole === "USER" ? "ADMIN" : "USER";

    try {
      await apiService.updateUserRole(id, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar.");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!isAdm) return;
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o usuário: ${name}?`);
    if (!confirmDelete) return;

    try {
      await apiService.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("Usuário deletado com sucesso!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao deletar usuário.");
    }
  }

  if (loading) {
    return <div className={styles.loading}>Carregando usuários...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciamento de Usuários</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={user.role === "ADMIN" ? styles.badgeAdm : styles.badgeUser}>
                  {user.role}
                </span>
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleToggleRole(user.id, user.role)}
                    className={styles.buttonToggle}
                    disabled={!isAdm}
                  >
                    {user.role === "USER" ? "Tornar ADMIN" : "Tornar USER"}
                  </button>

                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className={styles.buttonDelete}
                    disabled={!isAdm}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}