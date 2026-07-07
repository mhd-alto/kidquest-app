import api from "../axios";

// Achievements (definitions) & the join table that awards them to a user
export const getAchievements = () => api.get("/achievements");
export const getUserAchievements = () => api.get("/user-achievements");

// Badges (definitions) & the join table that awards them to a user
export const getBadges = () => api.get("/badges");
export const getUserBadges = () => api.get("/user-badges");
