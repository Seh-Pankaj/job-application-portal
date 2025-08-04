import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateFormValues } from "../redux/formSlice";
import { removeApplication } from "../redux/applicationSlice";

const ApplicationList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewDetails = (id) => {
    navigate(`/applications/${id}`);
  };

  const applications = useSelector((state) => state.applications);

  const handleEdit = (application) => {
    dispatch(updateFormValues(application));
    navigate(`/apply/${application.id}`, {
      state: { jobId: application.jobId },
    });
  };

  const handleDelete = (appId) => {
    dispatch(removeApplication(appId));
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Submitted Applications</h2>
      <div className="grid gap-4">
        {applications.length != 0
          ? applications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl p-4 shadow-md bg-amber-50"
              >
                <h3 className="text-xl font-bold">{app.title}</h3>
                <p className="text-gray-700 font-medium">
                  Applicant: {app.name}
                </p>
                <p className="text-gray-600 mt-2">{app.summary}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleViewDetails(app.id)}
                    className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700"
                  >
                    View Details
                  </button>
                  <div className="flex gap-5">
                    <FaRegEdit
                      size={20}
                      className="text-amber-600 cursor-pointer"
                      onClick={() => handleEdit(app)}
                    />
                    <IoTrashBinOutline
                      size={20}
                      className="text-amber-600 cursor-pointer"
                      onClick={() => handleDelete(app.id)}
                    />
                  </div>
                </div>
              </div>
            ))
          : "No Applications submitted. Please go back and submit an application"}
      </div>
    </div>
  );
};

export default ApplicationList;
