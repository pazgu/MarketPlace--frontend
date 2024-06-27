/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { PRODUCTS_BASE_URL } from "../constants/url.constant";

export default function Product({ details, setDetails }) {
  const { productId } = useParams();
  const URL = `${PRODUCTS_BASE_URL}/${productId}`;
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", price: "", category: "", quantity: "" });

  if (!details) return <p>Loading...</p>;

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: details.name,
      price: details.price,
      category: details.category,
      quantity: details.quantity
    });
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
      const editedProduct = { ...editData, _id: details._id };
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
          <p>Category: {details.category}</p>
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
                label="Category"
                name="category"
                value={editData.category}
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
