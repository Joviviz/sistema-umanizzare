import { useEffect, useState} from "react";
import styles from "./styles.module.css";

interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADM";
}

export function UsersManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Se o usuario loggado nao for adm e conseguir ver essa 
    // pagina de alguma forma ele nao vai conseguir editar os dados
    const userLoggedRole = localStorage.getItem("@Umanizzare:role") || "ADM";
    const isAdm = userLoggedRole == "ADM";

    async function loadUsers() {
        try {
            const token = localStorage.getItem("@Umanizzare:token");

            const response = await fetch("http://147.93.9.44:8002/users", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao carregar usuários.");
            }

            setUsers(data);
        } catch (err) {
            if (err instanceof Error){
                setError(err.message);
            } else {
                setError("Não foi possível conectar ao servidor");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    async function handleToggleRole(id: string, currentRole: "USER" | "ADM") {
        if (!isAdm) return;

        const newRole = currentRole === "USER" ? "ADM" : "USER";

        try {
            const token = localStorage.getItem("@Umanizzare:token");

            const response = await fetch(`http://147.93.9.44:8002/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role: newRole,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Erro ao atualizar permissão.");
            }

            setUsers((prevUsers) => 
                prevUsers.map((user) => (user.id === id ? { ...user, role: newRole } : user))
            );
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao atualizar.");
        }
    }

    // DELETE
    async function handleDelete
}