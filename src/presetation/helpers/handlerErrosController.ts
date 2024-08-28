import {
  ServerError,
  ValidationError as ValidationErrorApi,
} from "@/_shared/errors/Errors";
import { ValidationError as ValidationErrorYup } from "yup";

export const handlerErrorsController = (error: Error | ValidationErrorYup) => {
  if (error instanceof ValidationErrorApi) {
    return { message: error.message };
  }

  if (error instanceof ServerError) {
    return { message: error.message };
  }

  if (error instanceof ValidationErrorYup) {
    return { message: error.errors };
  }

  return { message: "Internal server error" };
};
