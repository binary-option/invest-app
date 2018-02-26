import axios from "axios";

const recipes = axios.create({
  baseURL: "http://localhost:3000/api"
});

export function getUsers() {
  return recipes.get("/users").then(res => {
    return res.data;
  });
}
