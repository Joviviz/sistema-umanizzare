const BASE_URL = "http://147.93.9.44:8002";

function getHeaders(contentTypeJson = true) {
  const token = localStorage.getItem("@Umanizzare:token");
  const headers: Record<string, string> = {};

  if (contentTypeJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const apiService = {
  // LOGIN
  async login(body: object) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "E-mail ou senha incorretos.");
    }
    return data;
  },

  // REGISTRO
  async register(body: object) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erro ao realizar o cadastro mestre.");
    }
    return data;
  },

  // LISTAR USUARIOS
  async getUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: getHeaders(true),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erro ao carregar usuários.");
    }
    return data;
  },

  // ALTERAR ROLE
  async updateUserRole(id: string, role: "USER" | "ADM") {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: getHeaders(true),
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erro ao atualizar permissão.");
    }
    return true;
  },

  // DELETAR USUARIO
  async deleteUser(id: string) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: getHeaders(true),
      body: JSON.stringify({ role }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erro ao atualizar permissão.");
    }
    return true;
  },
};
