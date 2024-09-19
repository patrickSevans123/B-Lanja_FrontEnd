// EditProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Updated imports
import axios from 'axios';
import { Button, TextField } from '@mui/material'; // Ensure axios and @mui/material are installed

const EditProduct = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate(); // Updated hook

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProductName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8080/products/${id}`, {
        name: productName,
        price: price,
      });
      navigate('/my-products'); // Updated usage
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">Update Product</Button>
    </form>
  );
};

export default EditProduct;
