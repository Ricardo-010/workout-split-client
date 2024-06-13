import axios from "axios";

/**
 * Creates an Axios instance with the base URL to call the API endpoints.
 */
const api = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "X-Custom-Header": "foobar",
  },
});

/**
 * Intercepts the API requests and adds the users token to the Authorization header due to the endpoints being private.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Intercepts the API responses to handle unauthorized errors.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Fetches a user's workouts.
 * @returns {Promise<Response>} -The response data, either a success message and the users workouts or an error message.
 */
export const fetchWorkouts = () => {
  return api.get(`/workouts/`);
};

/**
 * Creates a workout for a user.
 * @param {string} workoutName - The workout name.
 * @returns {Promise<Response>} -The response data, either a success message and the users new workout or an error message.
 */
export const createWorkout = (workoutName) => {
  return api.post("/workouts", { workoutName });
};

/**
 * Updates's a workout.
 * @param {string} recId - The workout's ID.
 * @param {string} workoutName - The workout's name.
 * @returns {Promise<Response>} - Either a success message, or an error message.
 */
export const updateWorkout = (recId, workoutName) => {
  return api.put(`/workouts`, { recId, workoutName });
};

/**
 * Deletes a workout for a user.
 * @param {string} workoutId - The workout id.
 * @returns {Promise<Response>} -The response data, either no content or an error message.
 */
export const deleteWorkout = (workoutId) => {
  return api.delete(`/workouts/${workoutId}`);
};

/**
 * Creates a exercise for a user.
 * @param {string} workoutRecId - The workout id.
 * @param {string} exerciseName - The exercise name.
 * @param {string} sets - The sets.
 * @returns {Promise<Response>} -The response data, either a success message and the users new exercise or an error message.
 */
export const createExercise = (workoutRecId, exerciseName, sets) => {
  return api.post("/exercises", {
    workoutRecId,
    exerciseName,
    sets,
  });
};

/**
 * Updates's a exercise.
 * @param {string} recId - The exercises ID.
 * @param {string} exerciseName - The exercises name.
 * @param {string} sets - The sets.
 * @returns {Promise<Response>} - Either a success message, or an error message.
 */
export const updateExercise = (recId, exerciseName, sets) => {
  return api.put(`/exercises`, { recId, exerciseName, sets });
};

/**
 * Deletes a exercise for a user.
 * @param {string} exerciseId - The exercise id.
 * @returns {Promise<Response>} -The response data, either no content or an error message.
 */
export const deleteExercise = (exerciseId) => {
  return api.delete(`/exercises/${exerciseId}`);
};
