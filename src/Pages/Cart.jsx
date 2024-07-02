/* eslint-disable react/prop-types */
import { Button, Grid, Typography, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { Link } from "react-router-dom";

function Cart({ myProducts, removeFromCart}) {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 2, mx: 2 }}>
        My Products
      </Typography>
      {myProducts.length === 0 ? (
        <p>No products added to cart yet.</p>
      ) : (
        <Grid container spacing={4} sx={{ mb: 2 }}>
          {myProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  src='https://i0.wp.com/ten-low.co.il/wp-content/uploads/2024/01/HP_LAPTOP_I7_ON_SALE.jpg?fit=1000%2C1000&ssl=1' 
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.categories.join(", ")}
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
  );
}

export default Cart;
