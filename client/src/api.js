import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000/api"
});

const errHandler = err => {
  console.error(err.response.data);
  throw err.response.data;
};

export function getUser(userInfo) {
  return service
    .post("/signup", userInfo)
    .then(res => res.data)
    .catch(errHandler);
}

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
      console.log(res);
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
