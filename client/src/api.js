import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api"
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export function signup(userInfo) {
  return service
    .post("/signup", userInfo)
    .then(res => res.data)
    .catch(errHandler);
}

export function login(username, password) {
  return service
    .post("/login", {
      username,
      password
    })
    .then(res => {
      const { data } = res;
      localStorage.setItem("user", JSON.stringify(data));
      axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
      return data;
    })
    .catch(errHandler);
}

export function logout() {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("user");
}

export function loadUser() {
  const userData = localStorage.getItem("user");
  if (!userData) return false;
  const user = JSON.parse(userData);
  if (user.token && user.name) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    return user;
  }
  return false;
}

export function getSecret() {
  return service
    .get("/secret")
    .then(res => res.data)
    .catch(errHandler);
}

export function getUser(userId) {
  return service
    .get(`/users/${userId}`)
    .then(res => res.data)
    .catch(errHandler);
}

export function updateUser(userId, userInfo) {
  const formData = new FormData();
  Object.keys(userInfo).forEach(key => formData.append(key, userInfo[key]));
  return service
    .post(`/users/${userId}`, userInfo)
    .post(`/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data)
    .catch(errHandler);
}


