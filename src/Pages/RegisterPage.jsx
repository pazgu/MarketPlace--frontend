import { useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { AUTH_BASE_URL } from "../constants/url.constant";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const newUser = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      await axios.post(`${AUTH_BASE_URL}/register`, newUser);
    } catch (error) {
      console.log("handling register submit",error);
      if (error.response && error.response.status === 400) {
        console.log("User already exists. Please choose a different username.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        marginTop: 3,
        marginBottom: '2rem'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginBottom: '2rem',
          marginTop: '2rem',
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          disabled={loading}
          fullWidth
          sx={{ height: '56px' }}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};
export default RegisterPage;