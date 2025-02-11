import api from "../config/axios";

export const login = async (email: string, password: string) => 
  api.post("/login", { email, password }).then((res) => res.data.token);

export const register = async (name: string, email: string, password: string) => 
  api.post("/register", { name, email, password }).then((res) => res.data);

