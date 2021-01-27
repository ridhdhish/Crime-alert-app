import validator from "validator";

export const validations = {
  firstname: {
    isValid: (value) => validator.isLength(value, { min: 1 }),
    message: (message) => (message ? message : "Please Provide firstname"),
  },
  lastname: {
    isValid: (value) => validator.isLength(value, { min: 1 }),
    message: (message) => (message ? message : "Please Provide lastname"),
  },
  email: {
    isValid: (value) => validator.isEmail(value),
    message: (message) => (message ? message : "Please Provide valid email"),
  },
  DOB: {
    isValid: (value) => {
      const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
      return re.test(value);
    },
    message: (message) =>
      message ? message : "Provide valid date(DD-MM-YYYY)",
  },
  mobileNumber: {
    isValid: (value) => validator.isMobilePhone(value, "en-IN"),
    message: (message) =>
      message ? message : "Please Provide valid mobileNumber",
  },
  address: {
    isValid: (value) => validator.isLength(value, { min: 1 }),
    message: (message) => (message ? message : "Please Provide address"),
  },
  password: {
    isValid: (value) => validator.isLength(value, { min: 8, max: 32 }),
    message: (message) =>
      message ? message : "Password must be of length 8-32.",
  },
  confirmPassword: {
    isValid: (value, password) => {
      console.log(value === password);
      return value === password;
    },
    message: (message) => (message ? message : "Passwords doesn't match."),
  },
};
