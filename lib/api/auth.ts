import api from "../axios";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = (payload: RegisterPayload) =>
  api.post("/auth/register", payload);

export const loginUser = (payload: LoginPayload) =>
  api.post("/auth/login", payload);

export const fetchProfile = () => api.get("/auth/profile");
