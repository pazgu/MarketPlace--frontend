/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function AddProductForm() {
    const [newProductName, setNewProductName] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [newProductQuantity, setNewProductQuantity] = useState(1);
    const [newProductCategory, setnewProductCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const navigateBack = useNavigate();

    function goBack () {
      navigateBack(-1);
    }

    async function createNewProduct (ev) {
      if (newProductName !== "" && newProductPrice!== "" && newProductCategory !== "" && newProductQuantity >= 1){
        ev.preventDefault();
        try {
          const newProduct = {
            name: newProductName,
            price: newProductPrice,
            quantity: newProductQuantity,
            category: newProductCategory,
          };
          setLoading(true);
          await axios.post("http://localhost:3000/api/products", newProduct);
          setNewProductName("");
          setNewProductPrice("");
          setNewProductQuantity(1);
          setnewProductCategory("");
          goBack();
        } catch (error) {
          console.error(error)
        } 
        finally {
          setLoading(false);
        }
      }
  }

    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', 
          mt: 2, 
        }}
      >
        <Box component="form" onSubmit={createNewProduct} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2, 
            width: '100%', 
            marginBottom: '2rem' ,
          }}>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add New Product
          </Typography>  
          <TextField 
            label="Add product name..."
            id="fullWidth"
            value={newProductName} 
            onChange={(ev) => setNewProductName(ev.target.value)} 
            sx={{ flex: 1 }} 
            fullWidth
            required
          />
          <TextField 
            label="Add price..."
            type="number"
            id="fullWidth"
            value={newProductPrice} 
            onChange={(ev) => setNewProductPrice(ev.target.value)} 
            sx={{ flex: 1 }} 
            fullWidth
            required
          />
          <TextField 
            label="Add quantity..."
            type="number"
            id="fullWidth"
            value={newProductQuantity} 
            onChange={(ev) => setNewProductQuantity(ev.target.value)} 
            sx={{ flex: 1 }} 
            fullWidth
            required
          />
            <TextField 
            label="Add category..."
            id="fullWidth"
            value={newProductCategory} 
            onChange={(ev) => setnewProductCategory(ev.target.value)} 
            sx={{ flex: 1 }}
            fullWidth
            required
          />
           <Tooltip title="Add Product">
            <Box sx={{ width: '100%' }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={loading}
                sx={{ height: '56px' }}
                fullWidth
                required
              >
              {loading ? <CircularProgress size={24} /> : <AddIcon />}
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      )
  }


export default AddProductForm