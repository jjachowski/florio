import { RegisterCredentials } from "../inputTypes/registerCredentials";

export const validateRegister = (credentials: RegisterCredentials) => {
  if (!credentials.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }
  if (credentials.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }

  if (credentials.username.includes("@")) {
    return [
      {
        field: "username",
        message: "username invalid",
      },
    ];
  }

  if (credentials.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }
  return null;
};
