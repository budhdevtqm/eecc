import { LoginValues, SignupValues } from "@/app/redux/authSlice";
import { emailRegex, passwordRegex } from "./common-vars";
import { UserValues, ProfileValidation } from "@/app/redux/userSlice";
import { CategoryValues } from "@/app/redux/categorySlice";
import { ProductValues } from "@/app/redux/productSlice";
import {
  AddressErrors,
  AddressValues,
  ContactValues,
} from "../redux/homeSlice";

export const validateSignup = (values: SignupValues) => {
  const { name, email, password } = values;
  let errors: Partial<SignupValues> = {};

  if (!name || name.trim() === "") {
    errors.name = "Please enter name!";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be of 3 chars!";
  }

  if (!email || email.trim() === "") {
    errors.email = "Please enter email!";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email pattern!";
  }

  if (!password || password.trim() === "") {
    errors.password = "Please enter password!";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Please enter a password at least of 8, (lowercase, uppercase, number and special) chars!";
  }
  return errors;
};

export const validateLogin = (values: LoginValues) => {
  const { email, password } = values;
  let errors: Partial<LoginValues> = {};

  if (!email || email.trim() === "") {
    errors.email = "Please enter email!";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email pattern!";
  }

  if (!password || password.trim() === "") {
    errors.password = "Please enter password!";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Please enter a password at least of 8, (lowercase, uppercase, number and special) chars!";
  }
  return errors;
};

export const validateUser = (values: UserValues) => {
  const { name, email, password, role } = values;
  const errors: Partial<UserValues> = {};

  if (!role || role.trim() === "") {
    errors.role = "Please select  permissions!";
  }

  if (!name || name.trim() === "") {
    errors.name = "Please enter name!";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be of 3 chars!";
  }

  if (!email || email.trim() === "") {
    errors.email = "Please enter email!";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email pattern!";
  }

  if (!password || password.trim() === "") {
    errors.password = "Please enter password!";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Please enter a password at least of 8, (lowercase, uppercase, number and special) chars!";
  }
  return errors;
};

export const validateCategory = (values: CategoryValues) => {
  const { name } = values;
  const errors: Partial<CategoryValues> = {};

  if (!name || name.trim() === "") {
    errors.name = "Please enter name!";
  } else if (name.trim().length < 3) {
    errors.name = "Name must of 3 chars!";
  }
  return errors;
};

export const validateProduct = (values: ProductValues, mode = "create") => {
  const { name, price, quantity, category, description, images } = values;
  const errors: Partial<ProductValues> = {};

  if (!name || name.trim() === "") {
    errors.name = "Please enter name!";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be of 3 chars!";
  }

  if (!(price as string)) {
    errors.price = "Please enter price!";
  } else if (Number(price) < 1) {
    errors.price = "Please enter valid price!";
  }

  if (!(quantity as string) || (quantity as string).trim() === "") {
    errors.quantity = "Please enter quantity!";
  } else if (Number(quantity) < 1) {
    errors.quantity = "Please enter valid quantity!";
  }

  if (!category || category.trim() === "") {
    errors.category = "Please enter category!";
  } else if (category.trim().length < 3) {
    errors.category = "Category must of 3 chars!";
  }

  if (!description || description.trim() === "") {
    errors.description = "Please enter the description!";
  } else if (description.trim().length < 20) {
    errors.description = "Please enter a valid description!";
  }

  if (mode === "create") {
    if (!images || images.length === 0) {
      errors.images = "Please add product images!";
    }
  }

  return errors;
};

export const validateUserProfileForm = (values: ProfileValidation) => {
  const { name, password } = values;
  const errors: Partial<ProfileValidation> = {};

  if (!name || name.trim() === "") {
    errors.name = "Please enter name!";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be of 3 chars!";
  }

  if (!password || password.trim() === "") {
    errors.password = "Please enter password!";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Please enter a password at least of 8, (lowercase, uppercase, number and special) chars!";
  }

  return errors;
};

export const validateAddress = (values: AddressValues) => {
  let errors: Partial<AddressErrors> = {};
  const { country, name, mobile, apartment, pin, city, state } = values;
  if (!country || name.trim() === "") {
    errors.country = "Please select your country";
  }

  if (!name || name.trim() === "") {
    errors.name = "Please enter name";
  } else if (name.trim().length < 3) {
    errors.name = "Name must be 3 chars";
  }

  if (!mobile || mobile.trim() === "") {
    errors.mobile = "Please enter mobile number";
  } else if (mobile.trim().length < 10) {
    errors.mobile = "Please enter valid mobile number";
  }

  if (!apartment || apartment.trim() === "") {
    errors.apartment = "Please enter apartment";
  } else if (apartment.trim().length < 4) {
    errors.apartment = "Please enter a descriptive apartment";
  }

  if (!pin || pin.trim() === "") {
    errors.pin = "Please enter PIN";
  } else if (pin.trim().length < 4) {
    errors.pin = "Please enter a valid PIN";
  }

  if (!city || city.trim() === "") {
    errors.city = "Please enter city";
  } else if (city.trim().length < 3) {
    errors.city = "City name must be of 3 chars";
  }

  if (!state || state.trim() === "") {
    errors.state = "Please enter state name";
  } else if (state.trim().length < 3) {
    errors.state = "state name must be of 3 chars";
  }
  return errors;
};

export const contactValidation = (values: ContactValues) => {
  const { first_name, last_name, email, message } = values;
  let errors: Partial<ContactValues> = {};

  if (!first_name || first_name.trim() === "") {
    errors.first_name = "Please enter first name";
  } else if (first_name.trim().length < 3) {
    errors.first_name = "First name must be 3 chars";
  }

  if (!last_name || last_name.trim() === "") {
    errors.last_name = "Please enter last name";
  } else if (last_name.trim().length < 3) {
    errors.last_name = "Last name must be 3 chars";
  }

  if (!email || email.trim() === "") {
    errors.email = "Please enter email!";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email pattern!";
  }

  if (!message || message.trim() === "") {
    errors.message = "Please enter the message!";
  } else if (message.trim().length < 20) {
    errors.message = "Message must be of at least 20 characters!";
  }

  return errors;
};
