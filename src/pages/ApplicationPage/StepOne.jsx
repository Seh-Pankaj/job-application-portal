import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { updateFormValues } from "../../redux/formSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../context/userContext";

const StepOne = ({ nextStep }) => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const location = useLocation();

  const jobId = location.state?.jobId;
  useEffect(() => {
    console.log(jobId);
    getJobData(jobId).then((value) => {
      setValues({
        ...values,
        title: value.title,
        summary: value.description,
        name: user.username,
        email: user.email,
        jobId: jobId,
      });
    });
  }, []);

  const formValues = useSelector((state) => state.formValues);

  const validate = (values) => {
    let errorValues = null;

    if (values.name.trim() === "")
      errorValues = { ...errorValues, name: "Name cannot be empty" };
    else if (values.name.trim().length < 3)
      errorValues = { ...errorValues, name: "Enter atleast 3 characters" };
    if (values.email.trim() === "")
      errorValues = { ...errorValues, email: "Email cannot be empty" };
    else {
      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !emailRegex.test(values.email.trim()) ||
        values.email.trim().length < 9
      ) {
        errorValues = { ...errorValues, email: "Invalid email address" };
      }
    }
    if (values.phone.trim() === "")
      errorValues = { ...errorValues, phone: "Phone Number cannot be empty" };
    else if (values.phone.trim().length != 10)
      errorValues = {
        ...errorValues,
        phone: "Phone Number length should be 10",
      };

    return errorValues;
  };
  const { values, setValues, errors, handleChange, validateForm } = useForm(
    formValues,
    validate
  );

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(updateFormValues(values));
      nextStep();
    }
  };

  return (
    <div className=" w-200 flex flex-col justify-between bg-white shadow-md rounded-xl p-4 min-[350px]:p-8 gap-4">
      <div className="w-full">
        <form action="" className="grid w-full grid-cols-1 sm:grid-cols-2 ">
          <div className="my-2">
            <label
              htmlFor="name"
              className="font-bold block mb-2 ml-2 text-amber-800"
            >
              Name
            </label>

            <input
              className="border-amber-500 outline-amber-600 rounded-md border-2 py-1 px-2 placeholder:text-amber-700"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={values.name}
            />
            {errors && errors.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
          </div>
          <div className="my-2">
            <label
              htmlFor="email"
              className="font-bold block mb-2 ml-2 text-amber-800"
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              className="border-amber-500 outline-amber-600 rounded-md border-2 py-1 px-2 placeholder:text-amber-700"
              placeholder="Enter Email"
              onChange={handleChange}
              value={values.email}
            />
            {errors && errors.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
          </div>
          <div className="my-2">
            <label
              htmlFor="number"
              className="font-bold block mb-2 ml-2 text-amber-800"
            >
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              id="number"
              className="border-amber-500 outline-amber-600 rounded-md border-2 py-1 px-2 placeholder:text-amber-700"
              placeholder="Enter Phone Number"
              maxLength={10}
              minLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                handleChange({ target: { name: "phone", value } });
              }}
              value={values.phone}
            />
            {errors && errors.phone && (
              <div className="text-red-500">{errors.phone}</div>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-between gap-16">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-amber-100 border-2 border-amber-400 font-semibold rounded-sm hover:bg-amber-200 transition-colors delay-75 duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const getJobData = async (jobId) => {
  const res = await fetch(`/api/jobs/${jobId}`);
  const data = await res.json();
  return data;
};

export default StepOne;
