import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await axios.get('http://localhost:8080/products');
        const userProducts = response.data.filter(product => product.user_id === userId);
        setProducts(userProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAdd = () => {
    navigate('/add-product');
  };

  return (
    <div>
      <Button variant="contained" onClick={handleAdd} style={{ marginBottom: '16px' }}>
        Add Product
      </Button>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Button onClick={() => handleEdit(product.id)} variant="outlined" style={{ marginTop: '8px' }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(product.id)} variant="outlined" color="error" style={{ marginTop: '8px' }}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MyProducts;
