// AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';
import { Button, TextField } from '@mui/material'; // Ensure axios and @mui/material are installed

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate(); // Updated hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/products', {
        name: productName,
        price: price,
      });
      navigate('/my-products'); // Updated usage
    } catch (error) {
      console.error('Error adding product:', error);
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
      <Button type="submit" variant="contained">Add Product</Button>
    </form>
  );
};

export default AddProduct;
