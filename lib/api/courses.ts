import api from "../axios";

export interface CoursePayload {
  title: string;
  description: string;
  instructor?: string;
  createdBy?: number;
}

export const getCourses = () => api.get("/courses");
export const getCourse = (id: number | string) => api.get(`/courses/${id}`);
export const createCourse = (data: CoursePayload) => api.post("/courses", data);
export const updateCourse = (id: number | string, data: Partial<CoursePayload>) =>
  api.patch(`/courses/${id}`, data);
export const deleteCourse = (id: number | string) => api.delete(`/courses/${id}`);
