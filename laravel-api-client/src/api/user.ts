import api from "../config/axios";

export const getUser = async () => 
    api.get("/user").then((res) => res.data.user);
  