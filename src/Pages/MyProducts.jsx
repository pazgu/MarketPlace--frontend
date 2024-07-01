/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Button, Grid, Typography, Card, CardContent, CardMedia, CardActions} from '@mui/material';
import { Link} from "react-router-dom";

const MyProducts = ({ myProducts, removeFromCart }) => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{my:2, mx:2}}>
        My Products
      </Typography>
      {myProducts.length === 0 ? (
        <p>No products added to cart yet.</p>
      ) : (
        <Grid container spacing={4} sx={{mb:2}}>
          {myProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
              <CardMedia
                  component="img"
                  height="200"
                  src={product.image} // Use a default image if product.image is not available
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/products/${product._id}`}>
                    View Details
                  </Button>
                  <Button size="small" color="secondary" onClick={() => removeFromCart(product._id)}>
                    Remove from Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default MyProducts