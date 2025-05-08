import { createAlova } from "alova";
import { axiosRequestAdapter } from "@alova/adapter-axios";
// import axiosInstance from "./your-axios-instance"; // 你现有的 axios 实例
import axiosInstance from "../request";
const alovaInst = createAlova({
  //   statesHook, // VueHook / ReactHook / SvelteHook
  requestAdapter: axiosRequestAdapter({
    axios: axiosInstance,
  }),
});

/**
 * axios适配器使用方案：
 * @param id
 * @returns
 */
const getUser = (id: number) => alovaInst.Get(`/user/${id}`);

const updateUser = (id: number, data: any) =>
  alovaInst.Put(`/user/${id}`, data);

const createUser = (data: any) => alovaInst.Post("/user", data);

const deleteUser = (id: number) => alovaInst.Delete(`/user/${id}`);

export { getUser, updateUser, createUser, deleteUser };
