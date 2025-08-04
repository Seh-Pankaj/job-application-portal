import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { resetFormValues } from "../../redux/formSlice";
import { useEffect } from "react";
import {
  addApplication,
  updateApplication,
} from "../../redux/applicationSlice";
import { useNavigate, useParams } from "react-router-dom";

const StepThree = ({ prevStep }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const formValues = useSelector((state) => state.formValues);

  const applications = useSelector((state) => state.applications);
  const hasApplication = applications.some((app) => app.id === id);
  const application = applications.find((app) => app.id === id);

  const dispatch = useDispatch();
  const validate = (values) => {
    let errorValues = null;
    if (values.coverLetter === null)
      errorValues = {
        ...errorValues,
        coverLetter: "Please upload cover letter",
      };
    else if (values.coverLetter.type !== "application/pdf")
      errorValues = { ...errorValues, coverLetter: "Only pdf is accepted" };
    return errorValues;
  };
  const { values, setValues, errors, handleChange, validateForm } = useForm(
    formValues,
    validate
  );

  const handleSubmit = () => {
    if (validateForm()) {
      hasApplication
        ? dispatch(updateApplication(values))
        : dispatch(addApplication(values));
      dispatch(resetFormValues());
      navigate(`/applications/${id}`, { replace: true });
    }
  };

  const today = new Date();
  const tarik = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth();

  const start = new Date(year, month, tarik + 3);
  const startDate = start.toISOString().substring(0, 10);

  // Inc one month
  const endDate = new Date(year, month + 1, tarik + 3);
  const endDateString = endDate.toISOString().substring(0, 10);

  useEffect(() => {
    setValues({ ...values, startDate: startDate, id: id });
  }, []);

  return (
    <div className=" w-200 flex flex-col justify-between bg-white shadow-md rounded-xl p-4 min-[350px]:p-8 gap-4">
      <div className="w-full">
        <form action="" className="grid w-full grid-cols-1 sm:grid-cols-2 ">
          <div className="my-2">
            <div className="font-bold text-amber-800 block mb-2 ml-2">
              Cover Letter
            </div>

            <input
              className="file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-amber-100 file:text-amber-700
             hover:file:bg-amber-200"
              accept="application/pdf"
              type="file"
              name="coverLetter"
              id="cover-letter"
              onChange={handleChange}
            />
            {application && (
              <a
                href={URL.createObjectURL(application.coverLetter)}
                download={application.coverLetter.name}
                className="text-amber-600 underline"
              >
                {application.coverLetter.name}
              </a>
            )}
            {errors && errors.coverLetter && (
              <div className="text-red-500">{errors.coverLetter}</div>
            )}
          </div>
          <div className="my-2">
            <label
              htmlFor="start-date"
              className="font-bold block mb-2 ml-2 text-amber-800"
            >
              Preferred Start Date
            </label>

            <input
              type="date"
              name="startDate"
              id="start-date"
              min={startDate}
              max={endDateString}
              className="border-amber-500 outline-amber-600 rounded-md border-2 py-1 px-2 placeholder:text-amber-700"
              defaultValue={startDate}
              onChange={handleChange}
            />
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
