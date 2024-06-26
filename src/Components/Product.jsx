/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import useAxios from "../Hooks/useAxios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {Grid, Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import { PRODUCTS_BASE_URL } from "../constants/url.constant";

export default function Product(props) {
  const { name, price, category, quantity} = props;
  const {productId} = useParams(); 
  const URL = `${PRODUCTS_BASE_URL}/${productId}`
  const { data, error, loading } = useAxios(URL);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", price: "", category: "" , quantity: ""});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  function goback() {
    navigate(-1);
  }

  async function handleDelete() {
    try {
      await axios.delete(URL, productId);
      goback();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else if (error.response) {
        console.log(error.request);
      } else {
        console.log(error);
      }
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: data.name,
      price: data.price,
      category: data.category,
      quantity: data.quantity
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
      const editedProduct = {...editData, _id: data._id}
      await axios.put(URL, editedProduct);
      setIsEditing(false);
      setEditData(editedProduct);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

 return (
    data && (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {!isEditing ? (
          <>
            <h1>{data.name}</h1>
            <p>ID: {data._id}</p>
            <p>Price: ${data.price}</p>
            <p>Category: {data.category}</p>
            <p>Quantity: {data.quantity}</p>
            <Button onClick={handleEdit} variant="contained" style={{ margin: '5px'}}>Edit</Button>
            <Button onClick={handleDelete} variant="outlined" color="error" style={{ margin: '5px'}}>Delete</Button>
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
    )
  );
}