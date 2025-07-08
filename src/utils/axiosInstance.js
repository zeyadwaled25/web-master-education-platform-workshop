import axios from "axios";

function createAxiosInstance(baseURL, contentType, includeAuthHeader = false) {
  const instance = axios.create({
    baseURL: baseURL,
  });

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

  const responseInterceptor = (response) => {
    console.log("response");
    console.log(response);
    return response.data;
  };

  const requestErrorInterceptor = (error) => {
    console.error("Request error");
    console.error(error);
    return Promise.reject(error);
  };

  const responseErrorInterceptor = (error) => {
    console.error("Response error");
    console.log(error);
    return Promise.reject(error);
  };

  instance.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
  );

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
