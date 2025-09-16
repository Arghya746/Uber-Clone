// src/pages/CaptainSignup.jsx
import React, { useState } from "react";
import axios from "axios";

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [vehicleType, setVehicleType] = useState("car");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = {
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        formData,
        { withCredentials: true }
      );

      setSuccess("Signup successful! You can now login.");
      console.log("Signup response:", res.data);

      // Clear form
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setColor("");
      setPlate("");
      setCapacity(1);
      setVehicleType("car");
    } catch (err) {
      console.error("Signup failed:", err);

      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e) => e.msg).join(", "));
      } else {
        setError(err.response?.data?.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Captain Signup</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Vehicle Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Vehicle Plate"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Vehicle Capacity"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
            min={1}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="auto">Auto</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
