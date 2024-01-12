"use client";
import React, { useState } from "react";
import FormError from "./FormError";
import Button from "./Button";
import { ContactValues } from "../redux/homeSlice";
import { contactValidation } from "../common-utils/validations";

const values = { first_name: "", last_name: "", email: "", message: "" };

const ContactUs: React.FC = () => {
  const [formValues, setFormValues] = useState<ContactValues>(values);
  const [errors, setErrors] = useState<Partial<ContactValues>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const validationResults = contactValidation(formValues);
    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      return;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="my-4 text-gray-600">
        <h1 className="font-bold text-[18px]">Get in Touch</h1>
      </div>
      <div className="w-[50%] bg-white mx-auto flex items-center justify-center flex-col pt-4 pb-8 px-8 shadow border border-gray-200 rounded-lg shadow-lg">
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 my-2">
            <div className="w-[50%] flex flex-col">
              <label className="ml-1 text-gray-700 ">First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="py-1 px-2 outline-primary text-black rounded-xl border-2 w-full"
                onChange={handleInputChange}
                value={formValues.first_name}
              />
              <FormError message={errors?.first_name ?? ""} />
            </div>

            <div className="w-[50%]">
              <label className="ml-1 text-gray-700">Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="py-1 px-2 outline-primary text-black rounded-xl border-2 w-full"
                onChange={handleInputChange}
                value={formValues.last_name}
              />
              <FormError message={errors?.last_name ?? ""} />
            </div>
          </div>

          <div className="my-2 flex flex-col">
            <label className="ml-1 text-gray-700 ">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              className="py-1 px-2 outline-primary text-black rounded-xl border-2 w-full"
              onChange={handleInputChange}
              value={formValues.email}
            />
            <FormError message={errors?.email ?? ""} />
          </div>
          <div className="my-2 flex flex-col">
            <label className="ml-1 text-gray-700">Message</label>
            <textarea
              name="message"
              rows={4}
              cols={50}
              onChange={handleTextAreaChange}
              placeholder="Please enter your message..."
              className="py-1 px-2 outline-primary text-black rounded-xl border-2 w-full"
            ></textarea>
            <FormError message={errors?.message ?? ""} />
          </div>
          <div className="flex items-center justify-center mt-6">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;