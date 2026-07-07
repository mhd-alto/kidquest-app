import api from '@/lib/axios';

// Users Management
export const adminApi = {
  // Users
  getUsers: () => api.get('/users'),
  getUser: (id: number) => api.get(`/users/${id}`),
  createUser: (data: any) => api.post('/users', data),
  updateUser: (id: string, data: any) => api.patch(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),

  // Groups
  getGroups: () => api.get('/groups'),
  getGroup: (id: number) => api.get(`/groups/${id}`),
  createGroup: (data: any) => api.post('/groups', data),
  updateGroup: (id: number, data: any) => api.patch(`/groups/${id}`, data),
  deleteGroup: (id: number) => api.delete(`/groups/${id}`),

  // User-Groups
  getUserGroups: () => api.get('/user-groups'),
  getUserGroup: (id: number) => api.get(`/user-groups/${id}`),
  createUserGroup: (data: any) => api.post('/user-groups', data),
  updateUserGroup: (id: number, data: any) => api.patch(`/user-groups/${id}`, data),
  deleteUserGroup: (id: number) => api.delete(`/user-groups/${id}`),

  // Courses
  getCourses: () => api.get('/courses'),
  getCourse: (id: number) => api.get(`/courses/${id}`),
  createCourse: (data: any) => api.post('/courses', data),
  updateCourse: (id: number, data: any) => api.patch(`/courses/${id}`, data),
  deleteCourse: (id: number) => api.delete(`/courses/${id}`),

  // Videos
  getVideos: () => api.get('/videos'),
  getVideo: (id: number) => api.get(`/videos/${id}`),
  createVideo: (data: any) => api.post('/videos', data),
  updateVideo: (id: number, data: any) => api.patch(`/videos/${id}`, data),
  deleteVideo: (id: number) => api.delete(`/videos/${id}`),

  // Enrollments
  getEnrollments: () => api.get('/enrollments'),
  getEnrollment: (id: number) => api.get(`/enrollments/${id}`),
  createEnrollment: (data: any) => api.post('/enrollments', data),
  updateEnrollment: (id: number, data: any) => api.patch(`/enrollments/${id}`, data),
  deleteEnrollment: (id: number) => api.delete(`/enrollments/${id}`),

  // Grades
  getGrades: () => api.get('/grades'),
  getGrade: (id: number) => api.get(`/grades/${id}`),
  createGrade: (data: any) => api.post('/grades', data),
  updateGrade: (id: number, data: any) => api.patch(`/grades/${id}`, data),
  deleteGrade: (id: number) => api.delete(`/grades/${id}`),

  // Quizzes
  getQuizzes: () => api.get('/quizzes'),
  getQuiz: (id: number) => api.get(`/quizzes/${id}`),
  createQuiz: (data: any) => api.post('/quizzes', data),
  updateQuiz: (id: number, data: any) => api.patch(`/quizzes/${id}`, data),
  deleteQuiz: (id: number) => api.delete(`/quizzes/${id}`),

  // Questions
  getQuestions: () => api.get('/questions'),
  getQuestion: (id: number) => api.get(`/questions/${id}`),
  createQuestion: (data: any) => api.post('/questions', data),
  updateQuestion: (id: number, data: any) => api.patch(`/questions/${id}`, data),
  deleteQuestion: (id: number) => api.delete(`/questions/${id}`),

  // Answers
  getAnswers: () => api.get('/answers'),
  getAnswer: (id: number) => api.get(`/answers/${id}`),
  createAnswer: (data: any) => api.post('/answers', data),
  updateAnswer: (id: number, data: any) => api.patch(`/answers/${id}`, data),
  deleteAnswer: (id: number) => api.delete(`/answers/${id}`),

  // Achievements
  getAchievements: () => api.get('/achievements'),
  getAchievement: (id: number) => api.get(`/achievements/${id}`),
  createAchievement: (data: any) => api.post('/achievements', data),
  updateAchievement: (id: number, data: any) => api.patch(`/achievements/${id}`, data),
  deleteAchievement: (id: number) => api.delete(`/achievements/${id}`),
};
