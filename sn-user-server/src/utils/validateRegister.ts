import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassowrd = (
  password: string,
  field: string = "password"
) => {
  const passwordLimit = 6;
  if (password.length < passwordLimit) {
    return [
      {
        field,
        message: `password must be ${passwordLimit} or more characters`,
      },
    ];
  }

  return null;
};

export const validateRegister = (options: UsernamePasswordInput) => {
  const usernameLimit = 3;
  if (options.username.length < usernameLimit) {
    return [
      {
        field: "username",
        message: `username must be ${usernameLimit} or more characters`,
      },
    ];
  }
  const emailLimit = 4;
  if (options.email.length < emailLimit || !validateEmail(options.email)) {
    return [
      {
        field: "email",
        message: `Invalide email`,
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: `username cannot include '@'`,
      },
    ];
  }

  validatePassowrd(options.password);

  return null;
};
