import { baseService } from "./base";
import axios from "axios";

const baseUrl = "/users";

const getAll = async (options = {}) => {
  return await baseService(options).get(`${baseUrl}`);
};

const getOneById = async (id, options = {}) => {
  return await baseService(options).get(`${baseUrl}/${id}`);
};

const getCurrent = async (options = {}) => {
  // const { headers, serverSide } = options;

  // if (serverSide) {
  //   const baseUrl =
  //     process.env.NODE_ENV === "development"
  //       ? "http://127.0.0.1:8000"
  //       : "https://macaroons-demo-next-13.vercel.app";
  //   try {
  //     let res = await axios.get(`${baseUrl}/api/v1/users/me`, {
  //       headers: { ...headers },
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // }
  return await baseService(options).get(`${baseUrl}/me`);
};

export const userService = {
  getAll,
  getOneById,
  getCurrent,
};
