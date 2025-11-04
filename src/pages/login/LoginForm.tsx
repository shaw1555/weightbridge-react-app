// import React, { useState } from "react";

// interface LoginFormProps {
//   onSubmit: (username: string, password: string) => void;
//   loading?: boolean;
//   error?: string;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(username, password);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded shadow-md w-80"
//     >
//       <h2 className="text-xl font-semibold mb-4">Login</h2>
//       {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

//       <input
//         type="text"
//         placeholder="Username"
//         className="w-full mb-2 px-3 py-2 border rounded"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full mb-4 px-3 py-2 border rounded"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;
