export const Validator = (type, value, confirmPasswordValue = "") => {
  switch (type) {
    case "password":
      if (value?.length <= 7 || !/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      }
      return "";
      case "first_password":
      if (value?.trim() === '') {
        return "Incorrect password"
      }
      return "";
    case "email":
      if (
        !value.match("^(?=.{1,256})(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$") ||
        value.includes("..")
      ) {
        return `Invalid email address. i.e. john@gmail.com`;
      }
      return "";
    case "confirmPassword":
      if (value !== confirmPasswordValue) {
        return "Password does not match";
      }
      return "";
    case "name":
      if (!value.match(/^[a-zA-Z\s]*$/)) {
        return "Name should only contain letters and spaces";
      }
      return "";
    case "phoneNumber":
      if (!value.match(/^[0-9]*$/)) {
        return "Phone number should only contain numbers";
      }
      return "";
    default:
      return "";
  }
};
