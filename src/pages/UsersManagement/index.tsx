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

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const userLoggedRole = localStorage.getItem("@Umanizzare:role") || "USER";
  const isAdm = userLoggedRole === "ADMIN";

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const data = await apiService.getUsers();
        
        console.log("Dados recebidos da API (Users):", data);

        if (isMounted) {
          setUsers(Array.isArray(data) ? data : data.users || []);
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

    return () => {
      isMounted = false;
    };
  }, []);

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

      if (currentUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      alert("Usuário deletado com sucesso!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao deletar usuário.");
    }
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {currentUsers.map((user) => (
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

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Anterior
          </button>
          
          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>

          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}