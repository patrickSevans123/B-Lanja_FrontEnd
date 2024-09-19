// pages/Home.js
import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box 
      p={5} 
      h="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={6} align="center">
        <Heading fontSize="6xl">Welcome to B'LANJA</Heading>
        <Text fontSize="2xl">Explore our features and get started!</Text>
        <Link to="/items">
          <Button colorScheme="teal" size="lg">Get Started</Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Home;
