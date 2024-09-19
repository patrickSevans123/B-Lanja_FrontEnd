import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, useToast, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id'); // Retrieve user_id from local storage

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token || !userId) {
        toast({
          title: "Not Logged In",
          description: "You need to be logged in to view your cart.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/carts/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        await response.json();
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast({
          title: "Error",
          description: "Failed to fetch cart items.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCartItems();
  }, [userId, token, toast]);

  const handleCheckout = async () => {
    if (!token || !userId) {
      toast({
        title: "Not Logged In",
        description: "You need to be logged in to checkout.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to complete checkout');
      }

      const data = await response.json();
      toast({
        title: "Checkout Successful",
        description: "Your order has been placed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCartItems([]); // Clear the cart
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Error",
        description: "Failed to complete checkout.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Your Cart</Heading>
      <VStack spacing={4} align="start">
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          cartItems.map(item => (
            <Box key={item.id} p={4} borderWidth={1} borderRadius="md" w="full">
              <HStack justify="space-between">
                <Text fontSize="lg">{item.product.name}</Text>
                <Text fontSize="lg">${item.product.price}</Text>
              </HStack>
              <Text>Quantity: {item.quantity}</Text>
            </Box>
          ))
        )}
      </VStack>

      <Divider my={4} />

      {/* Checkout Button */}
      <Button colorScheme="teal" onClick={handleCheckout}>
        Checkout
      </Button>

      {/* Back to Home Button */}
      <Link to="/">
        <Button mt={4} colorScheme="teal">Back to Home</Button>
      </Link>
    </Box>
  );
};

export default Cart;
