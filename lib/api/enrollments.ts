import api from "../axios";

export interface EnrollmentPayload {
  userId: number;
  courseId: number;
  status?: "active" | "completed" | "dropped";
}

export const getEnrollments = () => api.get("/enrollments");
export const getEnrollment = (id: number | string) => api.get(`/enrollments/${id}`);
export const createEnrollment = (data: EnrollmentPayload) =>
  api.post("/enrollments", data);
export const updateEnrollment = (
  id: number | string,
  data: Partial<EnrollmentPayload>
) => api.patch(`/enrollments/${id}`, data);
export const deleteEnrollment = (id: number | string) =>
  api.delete(`/enrollments/${id}`);
