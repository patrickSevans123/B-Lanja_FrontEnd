// pages/ItemDetails.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, Button, VStack, HStack, Avatar, Divider, useToast } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const ItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const toast = useToast();

  useEffect(() => {
    // Fetch detailed product data
    fetch(`http://localhost:8080/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast({
        title: "Not Logged In",
        description: "You need to be logged in to add items to your cart.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetch('http://localhost:8080/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId: id })
    })
      .then(response => response.json())
      .then(data => {
        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  if (!product) {
    return (
      <Box p={5}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  // Generate the avatar URL
  const avatarUrl = `https://i.pravatar.cc/150?${encodeURIComponent(product.seller)}.svg`;

  return (
    <Box p={5}>
      <HStack spacing={8} align="flex-start">
        <Image 
          src={`https://picsum.photos/400?random=${product.id}`} 
          alt={product.name} 
          boxSize="300px" 
          objectFit="cover" 
          borderRadius="md"
        />
        
        <VStack align="start" spacing={4} maxW="lg">
          <Heading fontSize="3xl">{product.name}</Heading>
          <Text fontSize="xl" color="gray.600"><strong>Price:</strong> ${product.price}</Text>

          <HStack spacing={4} align="center">
            <Avatar 
              src={avatarUrl} 
              name={product.seller} 
              size="md" 
              borderRadius="full" 
            />
            <Text fontSize="lg"><strong>Seller:</strong> {product.seller}</Text>
          </HStack>
          
          <Divider />
          <Text fontSize="lg">Detailed information about {product.name}.</Text>

          {/* Add to Cart Button */}
          <Button colorScheme="teal" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </VStack>
      </HStack>

      {/* Back to Item List Button */}
      <Link to="/items">
        <Button mt={4} colorScheme="teal">Back to Item List</Button>
      </Link>
    </Box>
  );
};

export default ItemDetails;
