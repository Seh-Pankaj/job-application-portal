import { useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobPage = () => {
  const job = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <section>
        <div className="container bg-amber-50 m-auto p-6">
          <Link
            to="/"
            className="text-amber-500  hover:text-amber-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-amber-50">
        <div className="container m-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%28%] w-full gap-6">
            <main>
              <div
                className="bg-white p-6 rounded-lg shadow-md 
                                text-center md:text-left"
              >
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div
                  className="text-gray-500 mb-1 flex align-middle 
                                    justify-center md:justify-start"
                >
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-amber-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>
                <h3 className="text-amber-800 text-lg font-bold mb-4">
                  Requirement
                </h3>

                <p className="mb-4">{job.requirements}</p>

                <h3 className="text-amber-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-amber-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-amber-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
                <button
                  onClick={() => {
                    const applyId = crypto.randomUUID();
                    navigate(`/apply/${applyId}`, { state: { jobId: job.id } });
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold 
                                    py-2 px-4 rounded-full w-full focus:outline-none 
                                    focus:shadow-outline mt-6 block"
                >
                  Apply Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
