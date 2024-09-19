// pages/Register.js
import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        toast({
          title: "Registration successful!",
          description: "You can now log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/login'); // Redirect to login page
      } else {
        const error = await response.json();
        toast({
          title: "Registration failed",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Unable to connect to the server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} maxWidth="400px" mx="auto">
      <VStack spacing={4} align="center">
        <Heading>Register</Heading>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl id="confirm-password">
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleSubmit}>Register</Button>
        <Text>
          Already have an account? <Link href="/login" color="teal.500">Login</Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default Register;
