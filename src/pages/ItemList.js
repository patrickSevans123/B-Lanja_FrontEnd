// pages/ItemList.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Button, Image, Grid, GridItem, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ItemList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <Box p={5}>
      <VStack spacing={6} align="center">
        <Heading fontSize="4xl">Item List</Heading>
        <Text fontSize="lg">Browse through our collection of items.</Text>

        {/* Display the list of products in a grid */}
        <Grid 
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} 
          gap={6}
          width="full"
        >
          {products.map(product => (
            <GridItem
              key={product.id}
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              display="flex"
              flexDirection="column"
            >
              {/* AspectRatio ensures the image maintains the correct aspect ratio */}
              <AspectRatio ratio={4 / 3} maxW="100%" width="100%">
                <Image 
                  src={`https://picsum.photos/${product.id}/400`} 
                  alt={product.name} 
                  objectFit="cover" 
                />
              </AspectRatio>
              <Box p={4} flex="1">
                <Text fontSize="xl" fontWeight="bold">{product.name}</Text>
                <Text fontSize="lg" color="gray.600">${product.price}</Text>
                <Link to={`/items/${product.id}`}>
                  <Button mt={2} colorScheme="teal">View Details</Button>
                </Link>
              </Box>
            </GridItem>
          ))}
        </Grid>

        {/* Navigation Button */}
        <Link to="/">
          <Button mt={4} colorScheme="teal">Back to Home</Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default ItemList;
