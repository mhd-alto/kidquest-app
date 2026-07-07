import api from "../axios";

export interface VideoPayload {
  courseId: number;
  title: string;
  description?: string;
  videoUrl: string;
  duration?: number;
  orderNumber?: number;
}

export const getVideos = () => api.get("/videos");
export const getVideo = (id: number | string) => api.get(`/videos/${id}`);
export const createVideo = (data: VideoPayload) => api.post("/videos", data);
export const updateVideo = (id: number | string, data: Partial<VideoPayload>) =>
  api.patch(`/videos/${id}`, data);
export const deleteVideo = (id: number | string) => api.delete(`/videos/${id}`);
