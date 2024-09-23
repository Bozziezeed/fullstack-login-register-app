import axios from "axios";

const baseURL = `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}`;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
  paramsSerializer: { indexes: null },
});

/**
 * ฟังก์ชั่นสำหรับ ดึงข้อมูล
 * @param {string} path
 * @param {{}} param
 * @return {{}}
 */
export const GET = async (path: string, param = {}) => {
  try {
    console.log("Calling GET on :>> ", path);

    const response = await api.get(path, {
      params: param,
      withCredentials: true,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw response.data
        ? response.data
        : { success: false, message: JSON.stringify(response.data) };
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

/**
 * ฟังก์ชั่นสำหรับ ส่งข้อมูล
 * @param {string} path
 * @param {{}} param
 * @param {{}} data
 * @return {{}}
 */
export const POST = async (path: string, param = {}, data: object) => {
  try {
    console.log("Calling POST on :>> ", path);

    const response = await api.post(path, data, {
      params: param,
      withCredentials: true,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw response.data
        ? response.data
        : { success: false, message: JSON.stringify(response.data) };
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const LOGIN = `${baseURL}/auth/login`;
export const REGISTER = `${baseURL}/auth/register`;
export const LOGOUT = `${baseURL}/auth/logout`;
export const USER = `${baseURL}/auth/user`;
