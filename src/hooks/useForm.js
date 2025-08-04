import { useState } from "react";

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      setValues({ ...values, [name]: e.target.files[0] });
    } else setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return validationErrors === null;
  };

  return { values, setValues, errors, handleChange, validateForm };
};

export default useForm;
