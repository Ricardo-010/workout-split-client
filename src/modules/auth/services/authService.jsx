import axios from "axios";

/**
 * Creates an Axios instance with the base URL to call the public API endpoints.
 */
const apiPublic = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "X-Custom-Header": "foobar",
  },
});

/**
 * Creates an Axios instance with the base URL to call the private API endpoint.
 */
const apiPrivate = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "X-Custom-Header": "foobar",
  },
});

/**
 * Intercepts the API requests and adds the users token to the Authorization header due to some endpoints being private.
 */
apiPrivate.interceptors.request.use(
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
apiPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * To login a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Response>} - The response data, either a token and a success message or a error message.
 */
export const login = (email, password) => {
  return apiPublic.post("/login", { email, password });
};

/**
 * To register a new user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Response>} - The response data, either a token and a success message or a error message.
 */
export const register = (email, password) => {
  return apiPublic.post("/register", { email, password });
};

/**
 * Updates's a user's password.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Response>} - Either no data, or an error message.
 */
export const updatePassword = (recId, password) => {
  return apiPrivate.put(`/user`, { recId, password });
};

/**
 * Delete's a user's account.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Response>} - Either no data, or an error message.
 */
export const deleteAccount = (userId) => {
  return apiPrivate.delete(`/user/${userId}`);
};
