/**
 * Function that handels all XHR requests error
 */
import userStatus from "./userStatus";
export default function errorHandler(err) {
  const requestError = err.request;
  const responseError = err.response;

  if (responseError) {
    // error in response
    switch (responseError.status) {
      case 400:
        if (responseError.data.message) {
          return {
            valid: true,
            message: responseError.data.message,
            type: "error",
          };
        } else {
          return {
            valid: true,
            message: responseError.data.error,
            type: "error",
          };
        }
      case 401:
        if (responseError.data.message) {
          return {
            valid: true,
            message: responseError.data.message,
            type: "error",
          };
        } else {
          return {
            valid: true,
            message: responseError.data.error,
            type: "error",
          };
        }
      case 403:
        // Auth error
        if (responseError.data.message === "Auth error") {
          userStatus("offline"); // Set User offline
          // redirect to login page
          return {
            valid: true,
            message: "You must login first to add products",
            path: "/login",
            type: "redirect",
          };
        } else if (responseError.data.message === "Wrong privileges") {
          // redirect to login page
          return {
            valid: true,
            message: "Only superadmin has permission to add products",
            path: "/login",
            type: "redirect",
          };
        } else {
          if (responseError.data.error) {
            if (Array.isArray(responseError.data.error)) {
              return {
                valid: true,
                message: responseError.data.error[0],
                type: "error",
              };
            } else {
              return {
                valid: true,
                message: responseError.data.error,
                type: "error",
              };
            }
          } else {
            return {
              valid: true,
              message: responseError.data.message,
              type: "error",
            };
          }
        }
      case 404:
        return {
          valid: true,
          message: "The item you looking for is not found",
          type: "redirect",
          path: "/404",
        };
      case 406:
        if (responseError.data.message) {
          return {
            valid: true,
            message: responseError.data.message,
            type: "error",
          };
        } else {
          return {
            valid: true,
            message: responseError.data.error,
            type: "error",
          };
        }
      case 500:
        return {
          valid: true,
          message: "Internal server error pleae try later",
          type: "error",
        };
      default:
        return {
          valid: true,
          message: "Unkown error",
          type: "error",
        };
    }
  } else if (requestError) {
    return { valid: true, message: "Connection error", type: "error" };
  } else {
    return { valid: true, message: "Unknown error", type: "error" };
  }
}
