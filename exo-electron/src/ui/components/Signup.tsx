import { useState } from "react";

interface SignupProps {
  onSubmit: (data: { username: string; password: string }) => void;
}

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-sm mx-auto p-4 border">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border "
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 border">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
