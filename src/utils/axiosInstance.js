import axios from "axios";

// Function to create Axios instances with common settings
function createAxiosInstance(baseURL, contentType, includeAuthHeader = false) {
  const instance = axios.create({
    baseURL: baseURL,
  });

  // Request interceptor function
  const requestInterceptor = (config) => {
    console.log("token");
    console.log(localStorage.getItem("token"));
    config.headers["Content-Type"] = contentType;
    if (includeAuthHeader && localStorage.getItem("token")) {
      config.headers["Authorization"] = `Token ${localStorage.getItem(
        "token"
      )}`;
    }
    console.log("config");
    console.log(config);
    return config;
  };

  // Response interceptor function
  const responseInterceptor = (response) => {
    console.log("response");
    console.log(response);
    return response.data;
  };

  // Error handler for request interceptor
  const requestErrorInterceptor = (error) => {
    console.error("Request error");
    console.error(error);
    return Promise.reject(error);
  };

  // Error handler for response interceptor
  const responseErrorInterceptor = (error) => {
    console.error("Response error");
    console.log(error);
    return Promise.reject(error);
  };

  // Apply request interceptor
  instance.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
  );

  // Apply response interceptor
  instance.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
  );

  return instance;
}

export const eduAPI = createAxiosInstance(
  import.meta.env.VITE_API_URL,
  "application/json",
  true
);
