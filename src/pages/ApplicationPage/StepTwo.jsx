import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { updateFormValues } from "../../redux/formSlice";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const StepTwo = ({ nextStep, prevStep }) => {
  const formValues = useSelector((state) => state.formValues);
  const [skillsArray, setSkillsArray] = useState(formValues.skills);
  const dispatch = useDispatch();
  const validate = () => {
    let errorValues = null;
    if (skillsArray.length < 3) {
      errorValues = { ...errorValues, skills: "Add atleast 3 skills" };
    }
    return errorValues;
  };
  const { values, errors, handleChange, validateForm } = useForm(
    formValues,
    validate
  );

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(
        updateFormValues({ experience: values.experience, skills: skillsArray })
      );
      nextStep();
    }
  };

  return (
    <div className="h-82 w-200 flex flex-col justify-between bg-white shadow-md rounded-xl p-8">
      <div className="w-full">
        <form action="" className="grid w-full grid-cols-1 ">
          <div className="my-2">
            <label
              htmlFor="experience"
              className="font-bold block mb-2 text-amber-800"
            >
              Experience
            </label>
            <input
              className=" outline-amber-600  border-2 py-1 px-2 border-amber-500 rounded-md placeholder:text-amber-700"
              type="number"
              name="experience"
              id="experience"
              placeholder="Enter years of exp"
              max="10"
              min="0"
              value={values.experience}
              onChange={handleChange}
            />{" "}
            yrs
            {errors && errors.experience && (
              <div className="text-red-500">{errors.experience}</div>
            )}
          </div>

          <div className="my-2">
            <label
              htmlFor="skills"
              className="font-bold block mb-2 ml-2 text-amber-800"
            >
              Skills
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                name="skills"
                id="skills"
                className="border-amber-500 outline-amber-600 rounded-md border-2 py-1 px-2 placeholder:text-amber-700"
                placeholder="Add Skills"
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    const val = e.target.value;
                    if (val !== "" && val.length > 2 && val.length < 20) {
                      setSkillsArray([...skillsArray, val]);
                    }
                    e.target.value = "";
                  }
                }}
                onChange={handleChange}
              />
              <div className="flex gap-1">
                {skillsArray.map((skill) => (
                  <div className="flex gap-1 items-center justify-center rounded-lg shadow-md border-gray-300 border-2 px-2 py-1">
                    <span>{skill}</span>
                    <RxCross2
                      size={18}
                      onClick={() =>
                        setSkillsArray(
                          skillsArray.filter((item) => item != skill)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {errors && errors.skills && (
              <div className="text-red-500">{errors.skills}</div>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-between gap-16">
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-amber-100 border-2 border-amber-400 font-semibold rounded-sm hover:bg-amber-200 transition-colors delay-75 duration-300"
          >
            Previous
          </button>
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

export default StepTwo;
