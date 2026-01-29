import api from "./axios";


export const login = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const register = (data: {id:string; email: string; password: string; role:string; name:string})=>{
    return api.post("/auth/register", data)
};