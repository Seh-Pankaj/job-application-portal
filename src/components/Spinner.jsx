import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="oklch(76.9% 0.188 70.08)"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
