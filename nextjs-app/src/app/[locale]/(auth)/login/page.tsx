/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getCookie } from "@/app/action";
import { Base_Response } from "@/models/response-model";
import { extractError } from "@/utils";
import { LOGIN, POST } from "@/utils/api.util";
import { useNotificationContext } from "@/utils/NotificationProvider";
import { ErrorMessage } from "@hookform/error-message";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const noti = useNotificationContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const localActive = useLocale();

  const getJWT = async () => {
    try {
      const jwt = await getCookie("jwt");
      if (jwt) {
        setIsAuthenticated(true);
        router.push(`/${localActive}/home`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJWT();
  }, []);

  /** variables */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const res = (await POST(
        LOGIN,
        {},
        {
          email: formData.email,
          password: formData.password,
        }
      )) as Base_Response;

      const { success, data } = res;
      if (success) {
        noti.success(`${data?.name} : Logged in successfully!`);
        router.push(`/${localActive}/home`);
      }
    } catch (err: unknown) {
      noti.error(extractError(err));
    }
  };

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-full  flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Your Company"
          src="/icons/logo-company.svg"
          className="mx-auto "
          width={47}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to you account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  validate: {
                    isValidPassword: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Email is not valid",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-500">* {message}</p>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  validate: {
                    minLength: (value: string) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters long.",
                    hasUppercase: (value: string) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter.",
                    hasLowercase: (value: string) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter.",
                    hasNumber: (value: string) =>
                      /\d/.test(value) ||
                      "Password must contain at least one number.",
                    hasSpecialChar: (value: string) =>
                      /[\W_]/.test(value) ||
                      "Password must contain at least one special character.",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500">* {message}</p>
                )}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href={`/${localActive}/register`}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
