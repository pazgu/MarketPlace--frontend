import { useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      console.log("Form submitted with data:", formData);
    } catch (error) {
      console.log(error);
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
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Login
        </Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            type="password"
            label="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Box>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;