import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { auth } from "../firebase/firebaseConfig";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      navigate("/dashboard");
    } catch (error: unknown) {
      setMessage(
        error instanceof Error ? error.message : "Registration failed."
      );
    }
  };

  const handlePageSwitch = (
    event: React.MouseEvent<HTMLAnchorElement>,
    destination: string
  ) => {
    event.preventDefault();

    if (isFlipping) return;

    setIsFlipping(true);

    window.setTimeout(() => {
      navigate(destination);
    }, 400);
  };

  return (
    <div className="auth-perspective min-h-screen bg-transparent flex items-center justify-center px-4">
      <div
        className={`auth-flip-card auth-glass-card w-full max-w-md p-8 ${
            isFlipping ? "auth-flip-out" : ""
          }`}>
        <div className="text-center mb-8">
          <div className="mx-auto bg-[#3E2F26] text-[#F4D58D] w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <FaUserPlus className="text-4xl" />
          </div>

          <h1 className="text-3xl font-bold text-[#3E2F26]">
            Create Account
          </h1>

          <p className="text-gray-700 mt-1">
            Register as a system user
          </p>
        </div>

        {message && (
          <div className="mb-5 bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="YourEmail@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#556B2F] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#556B2F] hover:bg-[#445523] text-white py-3 rounded-xl font-semibold shadow transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            onClick={(event) => handlePageSwitch(event, "/")}
            className="text-[#556B2F] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;