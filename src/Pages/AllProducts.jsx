/* eslint-disable no-unused-vars */
import useAxios from "../Hooks/useAxios"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { PRODUCTS_BASE_URL } from "../constants/url.constant";
import Product from "../Components/Product";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, CardActions} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NotFoundPage from "./NotFoundPage";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [notFound, setNotFound] = useState(false);

   useEffect(() => {
    async function getProducts() {
      const page = searchParams.get("page") || 1;
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const options = {
        params: {
          name: searchParams.get("name"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          inStock: searchParams.get("inStock"),
          page: page,
          limit: 6,
        },
      };
      try {
        const response = await axios.get(PRODUCTS_BASE_URL, options);
        const { products, total, page, pages } = response.data;
        if (products.length === 0) {
          setNotFound(true); // Set notFound to true if no products found
        } else {
          setProducts(products);
          setTotalPages(pages);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, [searchParams, setSearchParams]);

  function handleFilterChange(ev) {
    const inputName = ev.target.name;

    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      searchParams.set(inputName, checked);
    } else {
      const value = ev.target.value;
      searchParams.set(inputName, value);
    }

    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handlePagination(ev) {
    const value = ev.target.value;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  if(products.length === 0) return;

  if (notFound) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="create" 
        variant="contained" 
        color="primary" 
        sx={{ mb: 2 }}
      >
        Create Product
      </Button>
      <Box sx={{ my: 1, spaceY: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filter Products
        </Typography>
        <Box>
          <TextField
            label="Page"
            type="number"
            inputProps={{ min: 1 }}
            value={searchParams.get("page") || "1"}
            onChange={handlePagination}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={searchParams.get("inStock") === "true" || false}
                onChange={handleFilterChange}
                name="inStock"
                color="primary"
              />
            }
            label="In Stock"
          />
        </Box>
        <Box>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ mb: 2, width: '100%' }}
          />
        </Box>
        <Box>
          <TextField
            label="Min Price"
            type="number"
            name="minPrice"
            value={searchParams.get("minPrice") || 0}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ mb: 2, width: '100%' }}
          />
        </Box>
        <Box>
          <TextField
            label="Max Price"
            type="number"
            name="maxPrice"
            value={searchParams.get("maxPrice") || Number.MAX_SAFE_INTEGER}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ width: '100%' }}
          />
        </Box>
      </Box>
    </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  src={'https://i0.wp.com/ten-low.co.il/wp-content/uploads/2024/01/HP_LAPTOP_I7_ON_SALE.jpg?fit=1000%2C1000&ssl=1'} // Use a default image if product.image is not available
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
                  <Button size="small" color="secondary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePagination({ target: { value: index + 1 } })}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export default AllProducts