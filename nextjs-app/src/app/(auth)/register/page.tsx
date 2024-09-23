"use client";
import { Base_Response } from "@/models/response-model";
import { extractError } from "@/utils";
import { POST, REGISTER } from "@/utils/api.util";
import { useNotificationContext } from "@/utils/NotificationProvider";
import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

const Register = () => {
  const noti = useNotificationContext();
  const router = useRouter();

  /** variables */
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      const res = (await POST(
        REGISTER,
        {},
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          re_password: formData.re_password,
        }
      )) as Base_Response;

      const { success } = res;
      if (success) {
        noti.success(`Register successfully!`);
        router.push("/login");
      }
    } catch (err: unknown) {
      noti.error(extractError(err));
    }
  };

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
          Signup
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
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                autoComplete="additional-name"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-500">* {message}</p>
                )}
              />
            </div>
          </div>
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
                Create Password
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="c_password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="re_password"
                type="password"
                autoComplete="current-password"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("re_password", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: {
                    matchPassword: (value: string) =>
                      value === control._formValues.password ||
                      "Confirm password must match password",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="re_password"
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
