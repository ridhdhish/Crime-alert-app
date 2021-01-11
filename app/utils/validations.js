import validator from "validator";

export const validations = {
  firstname: {
    isValid: (value) => validator.isLength(value, { min: 1 }),
    message: "Please Provide firstname",
  },
  lastname: {
    isValid: (value) => validator.isLength(value, { min: 1 }),
    message: "Please Provide lastname",
  },
  email: {
    isValid: (value) => validator.isEmail(value),
    message: "Please Provide valid email",
  },
  DOB: {
    isValid: (value) => validator.isDate(value),
    message: "Please Provide valid date",
  },
  mobileNumber: {
    isValid: (value) => validator.isMobilePhone(value, "en-IN"),
    message: "Please Provide valid mobileNumber",
  },
  address: {
    isValid: (value) => validator.isLength(value, { min: 1 }),
    message: "Please Provide address",
  },
  password: {
    isValid: (value) => validator.isLength(value, { min: 8, max: 32 }),
    message: "Please Provide password, Password can be of length 8-32.",
  },
};
