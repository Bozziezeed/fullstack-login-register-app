"use client";
import axios from "axios";

export default function Home() {
  const url = "http://localhost:3001";

  const onRegister = async () => {
    try {
      const response = await axios.post(
        `${url}/auth/register`,
        {
          name: "doe9",
          email: "doe9@example.com",
          password: "@Pass1234",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 300000,
          paramsSerializer: { indexes: null },
          withCredentials: true,
          params: "",
        }
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button onClick={onRegister} className="p-2 bg-black">
      click here to register
    </button>
  );
}
