import type { AxiosInstance } from "axios";
import React from "react";
import { baseInstance } from "./Api";

const RegistrationService = (api: AxiosInstance = baseInstance) => ({
  register: async (email: string, password: string, username: string) => {
    const response = await api.post("/api/users", {
      email,
      password,
      username,
    });
    console.log("status", response.status);

    if (response && response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response;
  },
});

export default RegistrationService;
