import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateFormValues } from "../../redux/formSlice";

const ApplicationSummaryPage = () => {
  const { id } = useParams();
  const applications = useSelector((state) => state.applications);
  const application = applications.find((application) => application.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(updateFormValues(application));
    navigate(`/apply/${id}`, { state: { jobId: application.jobId } });
  };

  return (
    <div>
      {application !== undefined ? (
        <div className="max-w-3xl mx-auto p-6 bg-amber-50 shadow-xl rounded-xl">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Application Review
            </h2>
            <FaEdit onClick={handleEdit} />
          </div>

          <div className="space-y-4">
            <ReviewItem label="Name" value={application.name} />
            <ReviewItem label="Email" value={application.email} />
            <ReviewItem label="Phone" value={application.phone} />
            <ReviewItem
              label="Experience"
              value={`${application.experience} year(s)`}
            />
            <ReviewItem
              label="Skills"
              value={
                application.skills.length
                  ? application.skills.join(", ")
                  : "Not provided"
              }
            />
            <ReviewItem
              label="Start Date"
              value={
                application.startDate ? application.startDate : "Not selected"
              }
            />
            <ReviewItem
              label="Cover Letter"
              value={
                application.coverLetter ? (
                  <a
                    href={URL.createObjectURL(application.coverLetter)}
                    download={application.coverLetter.name}
                    className="text-amber-600 underline"
                  >
                    {application.coverLetter.name}
                  </a>
                ) : (
                  "Not uploaded"
                )
              }
            />
          </div>
        </div>
      ) : (
        <div>Invalid Application Id. Please go back</div>
      )}
    </div>
  );
};

const ReviewItem = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-900 text-right">{value}</span>
  </div>
);

export default ApplicationSummaryPage;
