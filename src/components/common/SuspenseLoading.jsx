import spinner from "../../assets/common/spinner.svg";

const SuspenseLoading = () => (
  <div className="flex flex-col items-center justify-center fixed inset-0">
    <img src={spinner} alt="spinner" className="animate-spin w-28" />
  </div>
);

export default SuspenseLoading;
