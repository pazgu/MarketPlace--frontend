/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link, useParams } from "react-router-dom"
import axios from 'axios';
import useAxios from "../Hooks/useAxios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product(props) {
  const {_id, name, price, category} = props;
  const {productId} = useParams(); 
  const URL = `http://localhost:3000/api/products/${productId}`
  const { data, error, loading } = useAxios(URL);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", price: "", category: "" });

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
      category: data.category
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
      await axios.put(URL, {
        ...editData,
        _id: data._id
      });
      setIsEditing(false);
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
            <h1>Product Details</h1>
            <p>ID: {data._id}</p>
            <p>Name: {data.name}</p>
            <p>Price: {data.price}</p>
            <p>Category: {data.category}</p>
            <button onClick={handleEdit} style={{ margin: '5px' }}>Edit</button>
            <button onClick={handleDelete} style={{ margin: '5px', color: 'red' }}>Delete</button>
          </>
        ) : (
          <form onSubmit={handleEditSubmit}>
            <h1>Edit Product</h1>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                required
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                required
              />
            </label>
            <br />
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleEditChange}
                required
              />
            </label>
            <br />
            <button type="submit" style={{ margin: '5px' }}>Save</button>
            <button type="button" onClick={handleCancelEdit} style={{ margin: '5px' }}>Cancel</button>
          </form>
        )}
      </div>
    )
  );
}