import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Save the token to localStorage
          localStorage.setItem('token', data.token);
          
          // Optionally, save user information if needed
          localStorage.setItem('user_id', JSON.stringify(data.user_id));
          localStorage.setItem('username', JSON.stringify(data.username));
          localStorage.setItem('email', JSON.stringify(data.email));

          
          // Redirect to home page
          navigate('/');
        } else {
          toast({
            title: "Login failed.",
            description: "Invalid email or password.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        toast({
          title: "Error.",
          description: "An error occurred during login.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={5}>
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </FormControl>
      <Button mt={4} colorScheme="teal" onClick={handleLogin}>
        Log In
      </Button>
    </Box>
  );
};

export default Login;
