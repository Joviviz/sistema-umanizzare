import React, { useEffect, useState } from "react";
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

  // busca de usuarios
  const [searchTerm, setSearchTerm] = useState("");

  // paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const userLoggedRole = localStorage.getItem("@Umanizzare:role") || "USER";
  const isAdm = userLoggedRole === "ADMIN";

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const data = await apiService.getUsers();

        // console.log("Dados recebidos da API (Users):", data);

        if (isMounted) {
          setUsers(Array.isArray(data) ? data : data.users || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível conectar ao servidor",
          );
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

  // TROCAR A ROLE
  async function handleToggleRole(id: string, currentRole: "USER" | "ADMIN") {
    if (!isAdm) return;
    const newRole = currentRole === "USER" ? "ADMIN" : "USER";

    try {
      await apiService.updateUserRole(id, newRole);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: newRole } : user,
        ),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar.");
    }
  }

  // DELETAR USUARIO
  async function handleDelete(id: string, name: string) {
    if (!isAdm) return;
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o usuário: ${name}?`,
    );
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

  // LOGICA DE BUSCA
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  // LOGICA DE PAGINACAO
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    // retornar pra pagina um quando bsucar usuario
    setCurrentPage(1);
  }

  // se estiver demorando para carregar
  if (loading) {
    return <div className={styles.loading}>Carregando usuários...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciamento de Usuários</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar nome ou email..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

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
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={
                      user.role === "ADMIN" ? styles.badgeAdm : styles.badgeUser
                    }
                  >
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
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                Nenhum usuário encontrado na busca.
              </td>
            </tr>
          )}
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
