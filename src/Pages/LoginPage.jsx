import { useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button variant="contained" endIcon={<SendIcon />}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;