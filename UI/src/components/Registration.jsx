import { useDispatch, useSelector } from "react-redux";
import {
  setPhone,
  setError,
  setLoading,
  setMessage,
  reset,
} from "../app/store.jsx";

import api from "../api/client.jsx";

const Registration = () => {
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.phone);
  const loading = useSelector((state) => state.auth.loading);
  const message = useSelector((state) => {
    state.auth.message;
  });
  const error = useSelector((state) => {
    state.auth.error;
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const res = await api.post("/registration", { phone });
      dispatch(
        setMessage(res.data.message || "OTP Sent and Registered Successfully")
      );
      dispatch(setPhone(""));
    } catch (err) {
      dispatch(setError(err.response?.data?.error || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mx-auto   shadow rounded-2xl bg-gray-100"
    >
      <h2 className="text-xl font-bold mb-4">Register with phone</h2>
      <input
        type="text"
        className="w-full p-2 border rounded mb-3"
        value={phone}
        placeholder="Enter Phone Number"
        onChange={(e) => dispatch(setPhone(e.target.value))}
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer">
        {loading ? "Sending OTP" : "Send OTP"}
      </button>
      {/* Show Success or Error */}
      {loading && <p className="text-gray-500">Processing...</p>}
      {phone && <p className="text-gray-700">Entered Phone:{phone}</p>}
      {/* {<p className="text-green-500"> {useSelector((s) => s.auth.message)}</p>}
      {<p className="text-red-500">{useSelector((s) => s.auth.error)}</p>} */}
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Registration;
