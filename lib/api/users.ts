import api from "../axios";

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
}

export const getUsers = () => api.get("/users");
export const getUser = (id: number | string) => api.get(`/users/${id}`);
export const updateUser = (id: number | string, data: UpdateUserPayload) =>
  api.patch(`/users/${id}`, data);
export const deleteUser = (id: number | string) => api.delete(`/users/${id}`);
