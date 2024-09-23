import { Base_Response } from "@/models/response-model";
import { AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractError(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Base_Response;
    return data.message;
  } else {
    return "An error occurred.";
  }
}
