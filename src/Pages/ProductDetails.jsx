/* eslint-disable no-unused-vars */
import React from 'react'
import Product from '../Components/Product'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function ProductDetails() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
  };

  return (
    <div>
      <Product/>
      <Button variant="contained" color="secondary" onClick={handleClick} sx={{mb:2 , ml:30}}>
      Back to Products
    </Button>
    </div>
  )
}

export default ProductDetails