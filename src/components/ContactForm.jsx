import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  querytype: "",
  consent: false,
};

const ContactForm = ({ onSuccess}) => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState({});
  

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  function validateForm() {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const newError = {};

    if (values.firstName === "") {
      newError.firstName = "This field is required";
    }
    if (values.lastName === "") {
      newError.lastName = "This field is required";
    }
    if (values.email === "") {
      newError.email = "This field is required";
    } else if (!values.email.match(regex)) {
      newError.email = "Please enter a valid email address";
    }
    if (values.message === "") {
      newError.message = "This field is required";
    }
    if (!values.consent) {
      newError.consent =
        "To submit this form, you must consent to being contacted";
    }
    if (!values.querytype) {
      newError.querytype = "Please select a query type";
    }
    setError(newError);

    return Object.keys(newError).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      setError({});
      onSuccess(values);
      setValues(initialValues);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="on"
      className="bg-[hsl(0,0%,100%)] md:w-[500px] text-[hsl(187,24%,22%)] rounded-xl p-8  min-w-0"
    >
      <h1 className="text-2xl mb-5 font-bold">Contact Us</h1>
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-between flex-col md:flex-row gap-3  ">
          <div className="w-full">
            <label
              className="text-[12px] font-medium block pb-1"
              htmlFor="firstName"
            >
              First Name <span className=" text-[hsl(169,82%,27%)]">*</span>
            </label>
            <input
              className={`outline px-4 py-2 text-[12px] transition-all duration-200 hover:outline-[hsl(169,82%,27%)] focus:outline-[hsl(169,82%,27%)] p-1 w-full ${error.firstName ? "outline-[hsl(0,66%,54%)]" : "outline-[hsl(186,15%,59%)]"} rounded-sm`}
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={values.firstName}
              required
            />
            {error.firstName && (
              <p className="text-[hsl(0,66%,54%)] mt-1 text-[12px]">
                {error.firstName}
              </p>
            )}
          </div>
          <div className="w-full">
            <label
              className="text-[12px] font-medium block pb-1"
              htmlFor="lastName"
            >
              Last Name <span className=" text-[hsl(169,82%,27%)]">*</span>
            </label>
            <input
              className={`outline px-4 py-2 text-[12px] transition-all duration-200 hover:outline-[hsl(169,82%,27%)] focus:outline-[hsl(169,82%,27%)] w-full p-1 ${error.lastName ? "outline-[hsl(0,66%,54%)]" : "outline-[hsl(186,15%,59%)]"} rounded-sm`}
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={values.lastName}
              required
            />
            {error.lastName && (
              <p className="text-[hsl(0,66%,54%)] mt-1 text-[12px]">
                {error.lastName}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="text-[12px] block font-medium pb-1" htmlFor="email">
            Email Address <span className=" text-[hsl(169,82%,27%)]">*</span>
          </label>
          <input
            className={`outline px-4 py-2 text-[12px] transition-all duration-200 hover:outline-[hsl(169,82%,27%)] focus:outline-[hsl(169,82%,27%)] w-full p-1 ${error.email ? "outline-[hsl(0,66%,54%)]" : "outline-[hsl(186,15%,59%)]"} rounded-sm `}
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
            onChange={handleChange}
            value={values.email}
            required
          />
          {error.email && (
            <p className="text-[hsl(0,66%,54%)] mt-1 text-[12px]">
              {error.email}
            </p>
          )}
        </div>
        <fieldset>
          <legend className="text-[12px]  font-medium block pb-1">
            Query Type <span className=" text-[hsl(169,82%,27%)]">*</span>
          </legend>
          <div className="flex w-full justify-between flex-col md:flex-row gap-3 ">
            <label
              htmlFor="general"
              className="has-checked:border-[hsl(169,82%,27%)] has-checked:bg-[hsl(148,38%,91%)] border transition-all duration-200 hover:border-[hsl(169,82%,27%)] border-[hsl(186,15%,59%)] cursor-pointer rounded-sm p-2 flex items-center w-full gap-2 "
            >
              <input
                type="radio"
                className="accent-[hsl(169,82%,27%)]"
                value="general"
                name="querytype"
                id="general"
                onChange={handleChange}
                checked={values.querytype === "general"}
                required
              />
              <span className="text-[13px]">General Enquiry</span>
            </label>
            <label
              htmlFor="support"
              className="has-checked:border-[hsl(169,82%,27%)] has-checked:bg-[hsl(148,38%,91%)] border transition-all duration-200 hover:border-[hsl(169,82%,27%)] border-[hsl(186,15%,59%)] w-full cursor-pointer rounded-sm p-2 flex items-center gap-2 "
            >
              <input
                type="radio"
                className="accent-[hsl(169,82%,27%)]"
                value="support"
                name="querytype"
                id="support"
                onChange={handleChange}
                checked={values.querytype === "support"}
                required
              />
              <span className="text-[13px]">Support Request</span>
            </label>
          </div>
          {error.querytype && (
            <p className="text-[hsl(0,66%,54%)] mt-1 text-[12px]">
              {error.querytype}
            </p>
          )}
        </fieldset>
        <div>
          <label
            htmlFor="message"
            className="text-[12px] font-medium block pb-1"
          >
            Message <span className=" text-[hsl(169,82%,27%)]">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            cols="1"
            rows="3"
            onChange={handleChange}
            value={values.message}
            className={`w-full transition-all duration-200 focus:outline-[hsl(169,82%,27%)] hover:outline-[hsl(169,82%,27%)] min-h-50 p-4 text-[12px] font-normal  md:min-h-25 outline ${error.message ? "outline-[hsl(0,66%,54%)]" : "outline-[hsl(186,15%,59%)]"} rounded-sm resize-none`}
            required
          ></textarea>
          {error.message && (
            <p className="text-[hsl(0,66%,54%)] mt-1 text-[12px]">
              {error.message}
            </p>
          )}{" "}
        </div>
      </div>
      <div className=" my-5">
        <div className="flex items-center gap-4 ">
          <input
            type="checkbox"
            className="transition-all duration-all duration-200 accent-[hsl(169,82%,27%)]"
            id="consent"
            name="consent"
            checked={values.consent}
            onChange={handleChange}
            required
          />

          <label
            className="text-[12px] font-medium  text-wrap "
            htmlFor="consent"
          >
            I consent to being contacted by the team{" "}
            <span className=" text-[hsl(169,82%,27%)]">*</span>
          </label>
        </div>
        {error.consent && (
          <p className="text-[hsl(0,66%,54%)] mt-1 text-[12px]">
            {error.consent}
          </p>
        )}
      </div>
      <button
        className="text-center active:scale-95 transition-all duration-200 w-full hover:bg-[hsl(169,50%,27%)] bg-[hsl(169,82%,27%)] text-[hsl(0,0%,100%)] py-2 rounded-sm text-[12px]"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default ContactForm;
