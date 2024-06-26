/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Product from '../Components/Product'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function ProductDetails() {
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
  }

  useEffect(()=> {

  }, [details]);

  return (
    <div>
      <Product/>
      <Button variant="contained" color="secondary" onClick={handleClick} sx={{mb:2 , ml:42}}>
        Back to Products
      </Button>
    </div>
  )
}

export default ProductDetails