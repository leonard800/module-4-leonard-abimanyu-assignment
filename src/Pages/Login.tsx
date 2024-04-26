import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginData {
    email: string;
    password: string;
}

export const LoginPage = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const requestHeaders: HeadersInit = {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/logout",
        {
          method: "DELETE",
          headers: requestHeaders,
        }
      );

      if (!response.ok) {
        throw new Error("We have a trouble logging you in");
      }

      localStorage.removeItem("token");
      setToken("");

      
    } catch (error) {
      console.error("We have a trouble logging you out", error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        console.error("Sorry, your login has failed", data.message);
      }
    } catch (error) {
      console.error("Error logging you in", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-4">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </Form>
        </Formik>
        {token && (
          <div className="mt-4">
            <p className="text-white mb-2">You are logged in.</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;