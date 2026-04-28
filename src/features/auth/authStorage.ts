import { api } from "@/api";
import type { Users } from "@/interfaces";


const USER_KEY = "user";
const TOKEN_KEY = "token";

export function getStoredUser(): Users | null {
  const stored = sessionStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) as Users : null;
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAuth(user: Users, token: string) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  sessionStorage.setItem(TOKEN_KEY, token);
  setApiToken(token);
}

export function clearAuth() {
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  removeApiToken();
}

export function setApiToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeApiToken() {
  delete api.defaults.headers.common["Authorization"];
}
