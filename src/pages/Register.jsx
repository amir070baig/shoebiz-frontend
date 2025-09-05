import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(registerUser({ name, email, password }));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login")
      }
    } catch (error) {
      console.error("Error while registering", error)
    }
  }
  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2">
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}