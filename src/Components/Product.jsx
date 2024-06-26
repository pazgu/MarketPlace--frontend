/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { PRODUCTS_BASE_URL } from "../constants/url.constant";

export default function Product({ details, setDetails }) {
  const { productId } = useParams();
  const URL = `${PRODUCTS_BASE_URL}/${productId}`;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", price: "", categories: "", quantity: "" });

  useEffect(() => {
    if (details) {
      setEditData({
        name: details.name,
        price: details.price,
        categories: details.categories.join(", "), // Join array to a comma-separated string
        quantity: details.quantity
      });
    }
  }, [details]);

  if (!details) return <p>Loading...</p>;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const editedProduct = {
        ...editData,
        categories: editData.categories.split(",").map(cat => cat.trim()), // Split string back into array
        _id: details._id
      };
      await axios.put(URL, editedProduct);
      setIsEditing(false);
      setDetails(editedProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(URL);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {!isEditing ? (
        <>
          <h1>{details.name}</h1>
          <p>ID: {details._id}</p>
          <p>Price: ${details.price}</p>
          <p>Category: {details.categories.join(", ")}</p> {/* Join array to display */}
          <p>Quantity: {details.quantity}</p>
          <Button onClick={handleEdit} variant="contained" style={{ margin: '5px' }}>Edit</Button>
          <Button onClick={handleDelete} variant="outlined" color="error" style={{ margin: '5px' }}>Delete</Button>
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Edit Product</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Categories"
                name="categories"
                value={editData.categories}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={editData.quantity}
                onChange={handleEditChange}
                required
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button type="submit" variant="contained" color="success" style={{ margin: '5px' }}>Save</Button>
              <Button variant="outlined" color="error" onClick={handleCancelEdit} style={{ margin: '5px' }}>Cancel</Button>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}